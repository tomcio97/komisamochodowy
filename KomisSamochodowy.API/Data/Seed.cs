using System.Collections.Generic;
using System.IO;
using KomisSamochodowy.API.Models;
using Newtonsoft.Json;

namespace KomisSamochodowy.API.Data
{
    public class Seed
    {
        private readonly DataContext context;
        public Seed(DataContext context)
        {
            this.context = context;
        }

        public void seedValues()
        {
            var value = File.ReadAllText("Data/ValueSeedData.json");
            var values = JsonConvert.DeserializeObject<List<Value>>(value);

            foreach(var item in values)
            {
                context.Values.Add(item);
            }
            context.SaveChanges();
        }
    }
}