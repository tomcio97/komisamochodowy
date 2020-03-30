using System.Collections.Generic;

namespace KomisSamochodowy.API.Models
{
    public class Value
    {
        public int Id { get; set; }
        public string Mark { get; set; }
        public string Model { get; set; }
        public string year { get; set; }
        public string EngineCapacity { get; set; }
        public string price  { get; set; }
        public string describe { get; set; }
        public string fuelType { get; set; }
        public string color { get; set; }
        public int numberOfDoors { get; set; }
        public string mileage { get; set; }


        public ICollection<Photo> Photos { get; set; }
    }
}