using System;

namespace KomisSamochodowy.API.Dtos
{
    public class QuestionForReturnDto
    {
        public int Id { get; set; }
         public string ValueMark { get; set; }
         public string ValueModel { get; set; }
         public string ValueYear { get; set; }
         public string ValueEngineCapacity { get; set; }
         public string ValuePrice { get; set; }
         public string ValueFueltype { get; set; }
         public string ValueColor { get; set; }
         public string ValueMileage { get; set; }
        public string email { get; set; }
        public string Content { get; set; }
        public DateTime sendDate { get; set; }
    }
}