using System;

namespace KomisSamochodowy.API.Dtos
{
    public class QuestionForCreationDto
    {
        public int ValueId { get; set; }
        public string email { get; set; }
        public string Content { get; set; }
        public DateTime sendDate { get; set; }

        public QuestionForCreationDto()
        {
            sendDate = DateTime.Now;
        }
    }
}