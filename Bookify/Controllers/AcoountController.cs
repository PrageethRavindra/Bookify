using Bookify.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Bookify.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AccountController : ControllerBase
{
    private readonly UserManager<User> _userManager;
    private readonly SignInManager<User> _signInManager;

    public AccountController(UserManager<User> userManager, SignInManager<User> signInManager)
    {
        _userManager = userManager;
        _signInManager = signInManager;
    }

    [HttpPost("register")]
public async Task<IActionResult> Register([FromBody] RegisterModel model)
{
    if (!ModelState.IsValid)
    {
        return BadRequest(new { message = "One or more fields are invalid.", errors = ModelState });
    }

    var user = new User
    {
        UserName = model.Username,
        Email = model.Email
    };

    var result = await _userManager.CreateAsync(user, model.Password);

    if (result.Succeeded)
    {
        return Ok(new { message = "Registration successful." });
    }

    return BadRequest(new { message = "Registration failed.", errors = result.Errors });
}


    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginModel model)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var result = await _signInManager.PasswordSignInAsync(model.Username, model.Password, model.RememberMe, false);

        if (result.Succeeded)
        {
            return Ok(new { message = "Login successful." });
        }

        return Unauthorized(new { message = "Invalid login attempt." });
    }

    [HttpPost("logout")]
    public async Task<IActionResult> Logout()
    {
        await _signInManager.SignOutAsync();
        return Ok(new { message = "Logout successful." });
    }
}
