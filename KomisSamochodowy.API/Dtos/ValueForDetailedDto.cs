using System.Collections.Generic;
using KomisSamochodowy.API.Models;

namespace KomisSamochodowy.API.Dtos
{
    public class ValueForDetailedDto
    {
        public int Id { get; set; }
        public string Mark { get; set; }
        public string Model { get; set; }
        public string year { get; set; }
        public string EngineCapacity { get; set; }
        public ICollection<PhotoForDetailedDto> Photos { get; set; }
        public string PhotoUrl { get; set; }
    }
}