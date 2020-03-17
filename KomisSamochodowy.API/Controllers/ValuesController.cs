using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using KomisSamochodowy.API.Models;
using KomisSamochodowy.API.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace KomisSamochodowy.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
        private readonly DataContext context;
        public ValuesController(DataContext context)
        {
            this.context = context;
        }
        // GET api/values
        [HttpGet]
        public async Task<IActionResult> GetValues()
        {
            var values = await context.Values.ToListAsync();
            return Ok(values);
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetValue(int id)
        {
            var value = await context.Values.FindAsync(id);
            if(value == null) return NoContent(); 
            return Ok(value);
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
            
            if(value.Mark != null) data.Mark = value.Mark;
            if(value.Model != null)data.Model = value.Model;
            if(value.year !=null)data.year = value.year;
            if(value.EngineCapacity !=null)data.EngineCapacity = value.EngineCapacity;

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
