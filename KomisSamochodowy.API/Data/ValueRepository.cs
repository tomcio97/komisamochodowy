using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using KomisSamochodowy.API.Helpers;
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

        public async Task<Photo> getMainPhoto(int valueId)
        {
            return await context.Photos.Where(p => p.ValueId == valueId).FirstOrDefaultAsync(p => p.IsMain);
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

        public async Task<PagedList<Value>> GetValues(ValueParams valueParams)
        {
            var values = context.Values.Include(p => p.Photos).AsQueryable();
            if(valueParams.Mark != null) values = values.Where(v => v.Mark.ToLower() == valueParams.Mark.ToLower());
            if(valueParams.Model != null) values = values.Where(v => v.Model.ToLower() == valueParams.Model.ToLower());
            if(valueParams.Year != null) values = values.Where(v => v.year.ToLower() == valueParams.Year.ToLower());
            if(valueParams.EngineCapacity !=null ) values = values.Where(v => v.EngineCapacity == valueParams.EngineCapacity);
            if(valueParams.PriceFrom != null || valueParams.PriceTo != "1000000") values = values.Where(v => Convert.ToInt16(v.price.Replace(" ", "")) >= Convert.ToInt16(valueParams.PriceFrom.Replace(" ", "")) && Convert.ToInt16(v.price.Replace(" ", "")) <= Convert.ToInt16(valueParams.PriceTo.Replace(" ", "")));
            if(!string.IsNullOrEmpty(valueParams.OrderBy))
            {
                switch(valueParams.OrderBy)
                {
                    case "recent": values = values.OrderByDescending(v => v.Id); 
                    break;
                    case "mark": values = values.OrderBy(v => v.Mark);
                    break;
                    case "model": values = values.OrderBy(v => v.Model);
                    break;
                    case "year": values = values.OrderBy(v => v.year);
                    break;
                    case "engineCapacity": values = values.OrderBy(v => v.EngineCapacity);
                    break;
                    case "mileage": values = values.OrderBy(v => v.mileage);
                    break;
                    case "price": values = values.OrderBy(v => Convert.ToInt16(v.price.Replace(" ", "")));
                    break;
                }
            }

            return await PagedList<Value>.CreateListAsync(values, valueParams.PageNumber, valueParams.PageSize);
        }
    }
}