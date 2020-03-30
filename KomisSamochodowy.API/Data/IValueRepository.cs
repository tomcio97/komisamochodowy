using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using KomisSamochodowy.API.Models;

namespace KomisSamochodowy.API.Data
{
    public interface IValueRepository: IGenericRepository
    {
         Task<IEnumerable<Value>> GetValues();
         Task<Value> GetValue(int id);

         Task<Photo> GetPhoto(int id);

    }
}