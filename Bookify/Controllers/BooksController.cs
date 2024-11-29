using Microsoft.AspNetCore.Mvc;
using Bookify.Data;

[ApiController]
[Route("api/[controller]")]
public class BooksController : ControllerBase
{
    private readonly LibraryContext_context;
    public BooksController(LibraryContext context)
    {
        _context =context;
    }
    [Httpget]
    public IActionResult GetBooks() => ok(_context.Book.ToList());

    [HttpPost]
    public IActionResult AddBook([FromBody] BooksController Book book)
    {
        _context.Books.Add(Book);
        _context.savechanges();
        return CreateAction(nameof(GetBooks), new {id = Book.Id }, book)
    }
}