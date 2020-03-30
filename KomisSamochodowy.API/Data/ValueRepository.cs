using System.Collections.Generic;
using System.Threading.Tasks;
using KomisSamochodowy.API.Models;
using Microsoft.EntityFrameworkCore;

namespace KomisSamochodowy.API.Data
{
    public class ValueRepository : GenericRepository, IValueRepository
    {
        private readonly DataContext context;
        public ValueRepository(DataContext context) : base(context)
        {
            this.context = context;
        }

        public async Task<Photo> GetPhoto(int id)
        {
            var photo = await context.Photos.FirstOrDefaultAsync(p => p.Id == id);
            return photo;
        }

        public async Task<Value> GetValue(int id)
        {
            var value = await context.Values.Include(v => v.Photos).FirstOrDefaultAsync(v => v.Id == id);
            return value;
        }

        public async Task<IEnumerable<Value>> GetValues()
        {
            var values = await context.Values.Include(p => p.Photos).ToListAsync();
            return values;
        }
    }
}