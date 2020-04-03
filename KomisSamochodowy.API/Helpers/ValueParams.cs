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
        
    }
}