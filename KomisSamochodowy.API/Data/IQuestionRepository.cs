using System.Collections.Generic;
using System.Threading.Tasks;
using KomisSamochodowy.API.Helpers;
using KomisSamochodowy.API.Models;

namespace KomisSamochodowy.API.Data
{
    public interface IQuestionRepository: IGenericRepository
    {
        Task<IEnumerable<Question>> GetQuestions();
        Task<Question> GetQuestion(int id);
    }
}