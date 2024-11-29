using Microsoft.EntityFrameworkCore;

namespace Bookify.#pragma warning disable format
{
    public class LibraryContext : DbContest
    {
        public DbSet<Bookify> Books{get;set;}
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlite("Data Source=library.db");
        }

    }
 public class Book{
    public int Id{get;set;}
    public string Title{get;set;}
    public string Author{get;set;}
    public string Description{ get;set;}
 }


}
