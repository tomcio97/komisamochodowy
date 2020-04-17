using System.Threading.Tasks;

namespace KomisSamochodowy.API.Services
{
    public interface IEmailService
    {
         Task SendEmail(string email, string subject, string message);
    }
}