using System.ComponentModel.DataAnnotations; // Add validation 

namespace Bookify.Models
{
    public class Book
    {
        public int Id { get; set; }

        [Required]  
        public string Title { get; set; }

        [Required]  
        public string Author { get; set; }

        [Required]  
        public string Description { get; set; }
    }
}
