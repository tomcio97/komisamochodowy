namespace KomisSamochodowy.API.Models
{
    public class Photo
    {
        public int Id { get; set; }
        public string Url { get; set; }
        public bool IsMain { get; set; }
        public Value value { get; set; }
        public int ValueId { get; set; }
    }
}