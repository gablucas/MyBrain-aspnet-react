using System.Text.Json.Serialization;

namespace webapi.Models
{
    public class Task
    {
        public int TaskId { get; set; }
        public string Description { get; set; }
        public int Checked { get; set; }
        public int TodoId { get; set; }
    }
}
