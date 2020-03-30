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
using System.Security.Claims;

namespace KomisSamochodowy.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ValuesController : ControllerBase
    {
        private readonly DataContext context;
        private readonly IMapper mapper;
        private readonly IValueRepository repository;

        public ValuesController(DataContext context, IMapper mapper, IValueRepository repository)
        {
            this.mapper = mapper;
            this.repository = repository;
            this.context = context;
        }
        // GET api/values
        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> GetValues()
        {
           var values = await repository.GetValues();
            var valuesToMapping = mapper.Map<IEnumerable<ValueForListDto>>(values);
            
            return Ok(valuesToMapping);
        }

        // GET api/values/5
        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetValue(int id)
        {
            var value = await repository.GetValue(id);
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
        public async Task<IActionResult> Put(int id, ValueForUpdateDto valueForUpdate)
        {
           var data = await repository.GetValue(id);

            mapper.Map(valueForUpdate, data);

            if(await repository.SaveAll())
                return Ok(data);

            return BadRequest();    
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
