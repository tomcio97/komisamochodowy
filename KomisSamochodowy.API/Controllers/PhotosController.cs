using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using KomisSamochodowy.API.Data;
using KomisSamochodowy.API.Dtos;
using KomisSamochodowy.API.Helpers;
using KomisSamochodowy.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace KomisSamochodowy.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/Values/{valueId}/photos")]
    public class PhotosController : ControllerBase
    {
        private readonly IMapper mapper;
        private readonly IOptions<CloudinarySettings> cloudinaryConfig;
        private readonly Cloudinary cloudinary;
        private readonly IValueRepository repository;

        public PhotosController(IValueRepository repository, IMapper mapper, IOptions<CloudinarySettings> cloudinaryConfig)
        {
            this.repository = repository;
            this.cloudinaryConfig = cloudinaryConfig;
            this.mapper = mapper;

            Account account = new Account(cloudinaryConfig.Value.CloudName, cloudinaryConfig.Value.ApiKey, cloudinaryConfig.Value.ApiSecret);
            cloudinary = new Cloudinary(account);
        }

        [HttpPost]
        public async Task<IActionResult> AddedPhotoForValue(int valueId, [FromForm] PhotoForCreationDto photoForCreation)
        {
            var value = await repository.GetValue(valueId);

            var file = photoForCreation.File;
            var uploadResult = new ImageUploadResult();

            if (file.Length > 0)
            {
                using (var stream = file.OpenReadStream())
                {
                    var uploadParams = new ImageUploadParams()
                    {
                        File = new FileDescription(file.Name, stream)
                    };

                    uploadResult = cloudinary.Upload(uploadParams);
                };
            }

            photoForCreation.Url = uploadResult.Uri.ToString();
            photoForCreation.PublicId = uploadResult.PublicId;

            var photo = mapper.Map<Photo>(photoForCreation);

             if (!value.Photos.Any(p => p.IsMain))
             {
                 photo.IsMain = true;
             }

            value.Photos.Add(photo);

            if(await repository.SaveAll())
            {
                var photoForReturn = mapper.Map<PhotoForReturnDto>(photo);
                return CreatedAtRoute("GetPhoto", new {id = photo.Id}, photoForReturn);
            }
                

            return BadRequest("Nie udało się dodać zdjęcia");
        }

        [HttpGet("{id}", Name = "GetPhoto")]
        public async Task<IActionResult> GetPhoto(int id)
        {
            var photo = await repository.GetPhoto(id);
            var photoForReturn = mapper.Map<PhotoForReturnDto>(photo);

            return Ok(photoForReturn);        
        }

        [HttpPost("{id}/setMain")]
        public async Task<IActionResult> SetMain(int valueId, int id)
        {
            var value = await repository.GetValue(valueId);

            if(!value.Photos.Any(p => p.Id == id)) return NotFound("Brak zdjęcia o takim id");

            var photo = await repository.GetPhoto(id);

            if(photo.IsMain) return BadRequest("To zdjęcie już jest główne");

            var mainPhoto = await repository.getMainPhoto(valueId);

            mainPhoto.IsMain = false;

            photo.IsMain = true;

            if(await repository.SaveAll())
                return NoContent();

            return BadRequest("Nie można ustawić zdjęcia jako głównego");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePhoto(int valueId, int id)
        {
            var value = await repository.GetValue(valueId);

            if(!value.Photos.Any(p => p.Id == id)) return NotFound("Brak zdjęcia o takim id");

            var photo = await repository.GetPhoto(id);

            if(photo.IsMain) return BadRequest("To zdjęcie już jest główne");

            if(photo.public_id != null)
            {    
                var destroyParams = new DeletionParams(photo.public_id);
                var result = cloudinary.Destroy(destroyParams);
                if(result.Result == "ok")
                {
                    repository.Delete(photo);
                }
            }

         if(photo.public_id == null) repository.Delete(photo);

         if(await repository.SaveAll())
         {
             return Ok(photo);
         }

        return BadRequest("Nie udało się usunąć");
        }

    }
}