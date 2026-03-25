using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using backend.API.DTOs;

namespace backend.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly UserManager<IdentityUser> _userManager;
    private readonly IConfiguration _config;

    public AuthController(UserManager<IdentityUser> userManager, IConfiguration config)
    {
        _userManager = userManager;
        _config = config;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
    {
        // 1. Buscar usuario en AspNetUsers
        var user = await _userManager.FindByEmailAsync(loginDto.Correo);
        if (user == null || !await _userManager.CheckPasswordAsync(user, loginDto.Password))
        {
            return Unauthorized(new { mensaje = "Credenciales inválidas" });
        }

        // 2. Obtener roles reales de la base de datos
        var userRoles = await _userManager.GetRolesAsync(user);

        // 3. Crear Claims
        var authClaims = new List<Claim>
        {
            new Claim(ClaimTypes.Name, user.Email!)
        };

        foreach (var userRole in userRoles)
        {
            authClaims.Add(new Claim(ClaimTypes.Role, userRole));
        }

      
        var secretKey = _config["JwtSettings:SecretKey"];
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey!));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            claims: authClaims,
            expires: DateTime.UtcNow.AddHours(2),
            signingCredentials: creds
        );

        return Ok(new
        {
            token = new JwtSecurityTokenHandler().WriteToken(token),
            rol = userRoles.FirstOrDefault()
        });
    }
}