using Microsoft.AspNetCore.Mvc;
using Bookify.Data;
using Bookify.Models;
using Microsoft.EntityFrameworkCore;

namespace Bookify.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BooksController : ControllerBase
    {
        private readonly LibraryContext _context;

        public BooksController(LibraryContext context)
        {
            _context = context;
        }

        // GET
        [HttpGet]
        public IActionResult GetBooks()
        {
            try
            {
                var books = _context.Books.ToList();
                return Ok(books);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // GET Method
        [HttpGet("{id}")]
        public IActionResult GetBook(int id)
        {
            try
            {
                var book = _context.Books.Find(id);
                if (book == null) return NotFound();
                return Ok(book);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // POST Method
        [HttpPost]
        public IActionResult AddBook([FromBody] Book book)
        {
            if (!ModelState.IsValid) 
            {
                return BadRequest(ModelState); // Return bad request if model state is invalid.
            }

            try
            {
                _context.Books.Add(book);
                _context.SaveChanges();
                return CreatedAtAction(nameof(GetBook), new { id = book.Id }, book);
            }
            catch (DbUpdateException dbEx)
            {
                // Log the exception and return a server error.
                return StatusCode(500, $"Error saving data: {dbEx.Message}");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // PUT Method
        [HttpPut("{id}")]
        public IActionResult UpdateBook(int id, [FromBody] Book book)
        {
            try
            {
                var existingBook = _context.Books.Find(id);
                if (existingBook == null) return NotFound();

                existingBook.Title = book.Title;
                existingBook.Author = book.Author;
                existingBook.Description = book.Description;
                _context.SaveChanges();

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // DELETE Method
        [HttpDelete("{id}")]
        public IActionResult DeleteBook(int id)
        {
            try
            {
                var book = _context.Books.Find(id);
                if (book == null) return NotFound();

                _context.Books.Remove(book);
                _context.SaveChanges();

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
