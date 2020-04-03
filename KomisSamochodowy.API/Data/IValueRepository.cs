using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using KomisSamochodowy.API.Helpers;
using KomisSamochodowy.API.Models;

namespace KomisSamochodowy.API.Data
{
    public interface IValueRepository: IGenericRepository
    {
         Task<PagedList<Value>> GetValues(ValueParams valueParams);
         Task<Value> GetValue(int id);

         Task<Photo> GetPhoto(int id);
        Task<Photo> getMainPhoto(int valueId);
    }
}