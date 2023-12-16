using System.Text.Json.Serialization;

namespace webapi.Models
{
    public class Tag
    {
        public int TagId { get; set; }
        public string Name { get; set; }
        [JsonIgnore]
        public List<Todo> Todos { get; set; }
    }
}
