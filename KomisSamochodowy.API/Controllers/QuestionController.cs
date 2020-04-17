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
    public class QuestionController : ControllerBase
    {
        private readonly IQuestionRepository repository;
        private readonly IMapper mapper;
        private readonly DataContext context;

        public QuestionController(IQuestionRepository repository, IMapper mapper, DataContext context)
        {
            this.context = context;
            this.repository = repository;
            this.mapper = mapper;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetQuestion(int id)
        {
            var question = await repository.GetQuestion(id);
            if (question != null)
            {
                return Ok(question);
            }

            return NotFound();
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

            if (await repository.SaveAll())
            {
                var questionToReturn = mapper.Map<QuestionForReturnDto>(questionFromMapper);
                return Ok(questionToReturn);
            }

            return BadRequest("Nie udało sie dodać zapytania");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteQuestion(int id)
        {
            var question = await repository.GetQuestion(id);
            if (question != null)
            {
                repository.Delete(question);

                if(await repository.SaveAll())
                {
                    return Ok();
                }
                return BadRequest("Nie udało sie usunąć");
            }
            return NotFound();
        }
    }
}