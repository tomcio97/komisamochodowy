using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using KomisSamochodowy.API.Data;
using KomisSamochodowy.API.Dtos;
using KomisSamochodowy.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace KomisSamochodowy.API.Controllers
{
    [Route("api/values/{valueId}/[controller]")]
    [ApiController]
    [Authorize]
    public class QuestionController: ControllerBase
    {
        private readonly IQuestionRepository repository;
        private readonly IMapper mapper;

        public QuestionController(IQuestionRepository repository, IMapper mapper)
        {
            this.repository = repository;
            this.mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetQuestions()
        {
            var questions = await repository.GetQuestions();
            var questionsToMapping = mapper.Map<IEnumerable<Question>>(questions);

            return Ok(questionsToMapping);
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> CreateQuestion(int valueId, QuestionForCreationDto question)
        {
            question.ValueId = valueId;
            var questionFromMapper = mapper.Map<Question>(question);

            repository.Add(questionFromMapper);

            if(await repository.SaveAll())
            {
                return Ok("Dodano zapytanie");
            }
        
            return BadRequest("Nie udało sie dodać zapytania");
        }
    }
}