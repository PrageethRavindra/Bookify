using Microsoft.EntityFrameworkCore;
using Bookify.Models;  

namespace Bookify.Data
{
    public class LibraryContext : DbContext
    {
        public LibraryContext(DbContextOptions<LibraryContext> options) : base(options)
        {
        }

        public DbSet<Book> Books { get; set; }  
    }
}
