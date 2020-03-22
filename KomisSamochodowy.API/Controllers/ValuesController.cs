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

namespace KomisSamochodowy.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ValuesController : ControllerBase
    {
        private readonly DataContext context;
        private readonly IMapper mapper;
        public ValuesController(DataContext context, IMapper mapper)
        {
            this.mapper = mapper;
            this.context = context;
        }
        // GET api/values
        //[AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> GetValues()
        {
            var values = await context.Values.Include(p => p.Photos).ToListAsync();
            var valuesToMapping = mapper.Map<IEnumerable<ValueForListDto>>(values);

            return Ok(valuesToMapping);
        }

        // GET api/values/5
        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetValue(int id)
        {
            var value = await context.Values.Include(p => p.Photos).FirstOrDefaultAsync(v => v.Id == id);
            if (value == null) return NoContent();

            var valueToMapping = mapper.Map<ValueForDetailedDto>(value);
            return Ok(valueToMapping);
        }

        // POST api/values
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Value value)
        {
            context.Values.Add(value);
            await context.SaveChangesAsync();

            return Ok(value);
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] Value value)
        {
            var data = await context.Values.FindAsync(id);

            if (value.Mark != null) data.Mark = value.Mark;
            if (value.Model != null) data.Model = value.Model;
            if (value.year != null) data.year = value.year;
            if (value.EngineCapacity != null) data.EngineCapacity = value.EngineCapacity;

            context.Values.Update(data);

            await context.SaveChangesAsync();

            return Ok(data);
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var value = await context.Values.FindAsync(id);
            context.Values.Remove(value);

            await context.SaveChangesAsync();

            return Ok(value);
        }
    }
}
