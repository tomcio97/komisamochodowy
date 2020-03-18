using System.Threading.Tasks;
using KomisSamochodowy.API.Models;

namespace KomisSamochodowy.API.Data
{
    public interface IAuthRepository
    {
         Task<User> Login(string username, string password);

         Task<User> Register(User user, string password);

         Task<bool> UserExist(string username);
    }
}