using System.ComponentModel.DataAnnotations;

namespace backend.API.DTOs;

public class LoginDto
{
    [Required(ErrorMessage = "El correo es obligatorio.")]
    [EmailAddress(ErrorMessage = "Formato de correo inválido.")]
    public string Correo { get; set; } = string.Empty;

    [Required(ErrorMessage = "La contraseña es obligatoria.")]
    public string Password { get; set; } = string.Empty;
}