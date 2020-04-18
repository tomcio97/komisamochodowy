using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using KomisSamochodowy.API.Models;
using KomisSamochodowy.API.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using AutoMapper;
using KomisSamochodowy.API.Dtos;
using System.Security.Claims;
using Microsoft.AspNetCore.Http;
using CloudinaryDotNet.Actions;
using CloudinaryDotNet;
using Microsoft.Extensions.Options;
using KomisSamochodowy.API.Helpers;

namespace KomisSamochodowy.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ValuesController : ControllerBase
    {
        private readonly DataContext context;
        private readonly IMapper mapper;
        private readonly IValueRepository repository;
        private readonly IOptions<CloudinarySettings> cloudinaryConfig;
        private readonly Cloudinary cloudinary;
        

        public ValuesController(DataContext context, IMapper mapper, IValueRepository repository, IOptions<CloudinarySettings> cloudinaryConfig)
        {
            this.mapper = mapper;
            this.repository = repository;
            this.cloudinaryConfig = cloudinaryConfig;
            this.context = context;

            Account account = new Account(cloudinaryConfig.Value.CloudName, cloudinaryConfig.Value.ApiKey, cloudinaryConfig.Value.ApiSecret);
            cloudinary = new Cloudinary(account);
        }
        // GET api/values
        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> GetValues([FromQuery] ValueParams valueParams)
        {
           var values = await repository.GetValues(valueParams);
            var valuesToMapping = mapper.Map<IEnumerable<ValueForListDto>>(values);
            
            Response.AddPagination(values.CurrentPage, values.PageSize, values.TotalCount, values.TotalPages);
            //  string price = "15 000";
            //  price = price.Replace(" ", "");
            //  int priceInt = Convert.ToInt16(price.Replace(" ", ""));
            //  Console.WriteLine("-----------------------------------------------------Cena" + priceInt);


            return Ok(valuesToMapping);
        }

        [HttpGet("questions")]
        public async Task<IActionResult> GetValuesWithQuestions()
        {
            var valueWithQuestions = await repository.GetQuestionsWithValues();
            var toReturn = mapper.Map<IEnumerable<QuestionForReturnDto>>(valueWithQuestions);

            return Ok(toReturn.OrderByDescending(q => q.sendDate));
        }

        // GET api/values/5
        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetValue(int id)
        {
            var value = await repository.GetValue(id);
            if (value == null) return NoContent();

            var valueToMapping = mapper.Map<ValueForDetailedDto>(value);
            return Ok(valueToMapping);
        }

        // POST api/values
        [HttpPost]
        public async Task<IActionResult> Post([FromForm] ValueForAddedDto valueForAdded)
        {
            var value = mapper.Map<Value>(valueForAdded);
            var file = valueForAdded.File;
            
            repository.Add(value);
            if(await repository.SaveAll())
            {
                await SavePhoto(value, file);
                return Ok(value);
            }
                
            
            return BadRequest("Nie udało sie dodać do bazy");
        }

        // [HttpPost("photo")]
        // public async Task<IActionResult> PostPhoto([FromForm] PhotoForCreationDto photo)
        // {
        //     Photo newPhoto = new Photo{
        //         Url =  "dupa dupa"
        //     };
        //     var value = valuetemporary;
        //     value.Mark="ale jaja";
        //     Console.WriteLine("dostalem zdjecie");
    

        //         return Ok();
        // }

        // PUT api/values/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, ValueForUpdateDto valueForUpdate)
        {
           var data = await repository.GetValue(id);

            mapper.Map(valueForUpdate, data);

            if(await repository.SaveAll())
                return Ok(data);

            return BadRequest();    
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var value = await repository.GetValue(id);
            if(value != null)
            {
                var questions = await repository.GetQuestionsFromValues(id);
                    foreach(var question in questions)
                    repository.Delete(question);

                var photos = value.Photos.ToList();
                foreach(var photo in photos)
                {
                   await DeletePhoto(photo);
                }

                repository.Delete(value);
            }

            await context.SaveChangesAsync();

            return Ok(value);
        }

        public async Task<IActionResult> SavePhoto(Value value, IFormFile file)
        {
            if(file.Length > 0)
            {
             var uploadResult = new ImageUploadResult();
             var stream = file.OpenReadStream();

             var uploadParams = new ImageUploadParams()
                    {
                        File = new FileDescription(file.Name, stream)
                    };

                     uploadResult = cloudinary.Upload(uploadParams);

                    var photo = new Photo{
                        Url= uploadResult.Uri.ToString(),
                        public_id = uploadResult.PublicId,
                        IsMain = true
                    };

                    value.Photos.Add(photo);

                    if(await repository.SaveAll())
                            return Ok();
            }
                           return BadRequest("Nie udało sie dodać zdjęcia"); 
        }

        public async Task<IActionResult> DeletePhoto(Photo photo)
        {
                var destroyParams = new DeletionParams(photo.public_id);
                var result = cloudinary.Destroy(destroyParams);
                if(result.Result == "ok")
                {
                    repository.Delete(photo);
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
    

