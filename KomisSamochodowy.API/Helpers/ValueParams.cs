namespace KomisSamochodowy.API.Helpers
{
    public class ValueParams
    {
        public int MaxPageSize { get; set; } = 18;
        public int PageNumber { get; set; } = 1;
        private int pageSize = 9;
        public int PageSize
        {         
            get { return pageSize; }
            set { pageSize = (value > MaxPageSize) ? MaxPageSize : value;}
        }

        public string Mark { get; set; }
        public string Model { get; set; } 
        public string Year { get; set; }
        public string EngineCapacity { get; set; }
        public string PriceFrom { get; set; } = "0";
        public string PriceTo { get; set; } = "30000";
        public string OrderBy { get; set; } = "recent";
        public bool question { get; set; } = false;
        
    }
}