using System.Text.Json.Serialization;

namespace webapi.Models
{
    public class Todo
    {
        public Todo() 
        {
            Tasks = new List<Task>();
        }

        public int TodoId { get; set; }
        public string Title { get; set; }
        public string Color { get; set; }
        public Tag Tag { get; set; }
        public List<Task> Tasks { get; set; }
    }
}
