using Bookify.Data;
using Bookify.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configure SQLite Database.
builder.Services.AddDbContext<LibraryContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

// Add Identity services for authentication and authorization.
builder.Services.AddIdentity<User, IdentityRole>(options =>
{
    options.Password.RequireDigit = true;
    options.Password.RequiredLength = 6;
    options.Password.RequireNonAlphanumeric = false;
    options.Password.RequireUppercase = true;
    options.Password.RequireLowercase = true;
})
    .AddEntityFrameworkStores<LibraryContext>()
    .AddDefaultTokenProviders();

// Configure CORS.
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader());
});

// Configure authentication and authorization.
builder.Services.ConfigureApplicationCookie(options =>
{
    options.Cookie.HttpOnly = true;
    options.Cookie.SecurePolicy = CookieSecurePolicy.Always; // Requires HTTPS
    options.ExpireTimeSpan = TimeSpan.FromMinutes(60);
    options.LoginPath = "/api/account/login"; // Redirect to login path
    options.AccessDeniedPath = "/api/account/accessdenied"; // Redirect to access denied path
});

var app = builder.Build(); // Create the app.

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthentication(); // Enable authentication middleware.
app.UseAuthorization();  // Enable authorization middleware.

// Enable CORS.
app.UseCors("AllowAll");

// Map controllers.
app.MapControllers();

app.Run();
