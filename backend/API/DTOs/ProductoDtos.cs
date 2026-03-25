using System.ComponentModel.DataAnnotations;

namespace backend.API.DTOs;

public class ProductosDto
{
    public int Id { get; set; }
    public string Nombre { get; set; } = string.Empty;
    public string Descripcion { get; set; } = string.Empty;
    public decimal Precio { get; set; }
    public string SKU { get; set; } = string.Empty;
    public int Inventario { get; set; }
    public string Imagen { get; set; } = string.Empty;
}

public class ProductoCreateUpdateDto
{
    [Required(ErrorMessage = "El nombre del producto es obligatorio.")]
    [StringLength(150, ErrorMessage = "El nombre no puede exceder los 150 caracteres.")]
    public string Nombre { get; set; } = string.Empty;

    [StringLength(500, ErrorMessage = "La descripción no puede exceder los 500 caracteres.")]
    public string Descripcion { get; set; } = string.Empty;

    [Required(ErrorMessage = "El precio es obligatorio.")]
    [Range(0.01, 100000.00, ErrorMessage = "El precio debe ser mayor a 0.")]
    public decimal Precio { get; set; }

    [Required(ErrorMessage = "El SKU es obligatorio.")]
    [StringLength(50, ErrorMessage = "El SKU no puede exceder los 50 caracteres.")]
    public string SKU { get; set; } = string.Empty;

    [Required(ErrorMessage = "El inventario es obligatorio.")]
    [Range(0, int.MaxValue, ErrorMessage = "El inventario no puede ser negativo.")]
    public int Inventario { get; set; }

    [Required(ErrorMessage = "La imagen es obligatoria.")]
    [Url(ErrorMessage = "Debe proporcionar una URL válida para la imagen.")]
    public string Imagen { get; set; } = string.Empty;
}