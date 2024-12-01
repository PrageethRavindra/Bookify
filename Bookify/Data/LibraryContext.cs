using Microsoft.EntityFrameworkCore;
using Bookify.Models;  
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace Bookify.Data
{
    public class LibraryContext : IdentityDbContext<User>
    {
        public LibraryContext(DbContextOptions<LibraryContext> options) : base(options)
        {
        }

        public DbSet<Book> Books { get; set; }  
        
    }
}
