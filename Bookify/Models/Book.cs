using System.ComponentModel.DataAnnotations; // Add this for validation attributes

namespace Bookify.Models
{
    public class Book
    {
        public int Id { get; set; }

        [Required]  // Ensures that Title is required
        public string Title { get; set; }

        [Required]  // Ensures that Author is required
        public string Author { get; set; }

        [Required]  // Ensures that Description is required
        public string Description { get; set; }
    }
}
