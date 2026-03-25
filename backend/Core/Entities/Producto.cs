using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace backend.Core.Entities;


[Table("Productos")]
[Index(nameof(SKU), IsUnique = true)]
public class Producto
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    [Required]
    [MaxLength(150)] 
    public string Nombre { get; set; } = string.Empty;

    [MaxLength(500)]
    public string Descripcion { get; set; } = string.Empty;

    [Required]
    [Column(TypeName = "decimal(18,2)")] 
    public decimal Precio { get; set; }

    [Required]
    [MaxLength(50)]
    public string SKU { get; set; } = string.Empty;

    [Required]
    public int Inventario { get; set; }

    [Required]
    [MaxLength(1000)]
    public string Imagen { get; set; } = string.Empty;
}