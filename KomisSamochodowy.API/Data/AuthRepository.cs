using System;
using System.Text;
using System.Threading.Tasks;
using KomisSamochodowy.API.Models;
using Microsoft.EntityFrameworkCore;

namespace KomisSamochodowy.API.Data
{
    public class AuthRepository : IAuthRepository
    {
        private readonly DataContext context;
        public AuthRepository(DataContext context)
        {
            this.context = context;
        } 
        public async Task<User> Login(string username, string password)
        {
            var user = await context.Users.FirstOrDefaultAsync(x => x.UserName == username);
            if(user == null) return null;

            if(!VerifyPasswordHash(password, user.PasswordHash, user.PasswordSalt))
            return null;

            return user; 
        }

     

        public async Task<User> Register(User user, string password)
        {
            byte [] passwordHash;
            byte [] passwordSalt;

            CreatePasswordSaltHash(password,  out passwordHash, out passwordSalt);

            user.PasswordSalt = passwordSalt;
            user.PasswordHash = passwordHash;
            await context.Users.AddAsync(user);

            await context.SaveChangesAsync();

            return user;
        }

      
        public async Task<bool> UserExist(string username)
        {
            if(await context.Users.AnyAsync(x => x.UserName == username)) return true;

            return false;
        }

          private void CreatePasswordSaltHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using(var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
            }
        }

           private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
              using(var hmac = new System.Security.Cryptography.HMACSHA512(passwordSalt))
            {
              var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));

                for(int i=0; i<computedHash.Length; i++)
                {
                    if(computedHash[i] != passwordHash[i]) return false;
                }
                return true;
            }
        }

    }
}