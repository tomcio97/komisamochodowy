using System;

namespace KomisSamochodowy.API.Models
{
    public class Question
    {
        public int Id { get; set; }
        public int ValueId { get; set; }
        public Value Value { get; set; }
        public string email { get; set; }
        public string Content { get; set; }
        public DateTime sendDate { get; set; }
    }
}