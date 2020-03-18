using System.ComponentModel.DataAnnotations;

namespace KomisSamochodowy.API.Dtos
{
    public class UserForRegisterDto
    {
        [Required(ErrorMessage="Nazwa użytkownika jest wymagana")]
        public string UserName { get; set; }

        [Required(ErrorMessage="Hasło jest wymagane")]
        [StringLength(12, MinimumLength=6, ErrorMessage="Hasło musi składać się z 6 do 12 znaków")]
        public string password { get; set; }
    }
}