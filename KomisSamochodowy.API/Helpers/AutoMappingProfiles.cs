using System.Linq;
using AutoMapper;
using KomisSamochodowy.API.Dtos;
using KomisSamochodowy.API.Models;

namespace KomisSamochodowy.API.Helpers
{
    public class AutoMappingProfiles : Profile
    {
        public AutoMappingProfiles()
        {
            CreateMap<Value, ValueForListDto>().ForMember(dest => dest.PhotoUrl, opt => opt.ResolveUsing(src => src.Photos.FirstOrDefault(p => p.IsMain).Url));
            CreateMap<Value, ValueForDetailedDto>().ForMember(dest => dest.PhotoUrl, opt => opt.ResolveUsing(src => src.Photos.FirstOrDefault(p => p.IsMain).Url));
            CreateMap<Photo, PhotoForDetailedDto>();
            CreateMap<ValueForUpdateDto, Value>();
            CreateMap<PhotoForCreationDto, Photo>();
            CreateMap<Photo, PhotoForReturnDto>();
            CreateMap<ValueForAddedDto, Value>();
        }
        
    }
}