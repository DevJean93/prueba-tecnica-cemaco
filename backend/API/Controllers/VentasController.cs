using backend.API.DTOs;
using backend.Hubs;
using backend.Infraestructura.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;



namespace backend.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class VentasController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly IHubContext<InventoryHub> _hubContext;

    public VentasController(AppDbContext context, IHubContext<InventoryHub> hubContext)
    {
        _context = context;
        _hubContext = hubContext;
    }

    [HttpPost("checkout")]
    public async Task<IActionResult> ProcesarVenta([FromBody] List<ItemCarritoDto> items)
    {
        if (items == null || !items.Any()) return BadRequest("El carrito está vacío.");

  
        using var transaction = await _context.Database.BeginTransactionAsync();

        try
        {
            foreach (var item in items)
            {
                var producto = await _context.Productos.FindAsync(item.ProductoId);

                if (producto == null) return NotFound($"Producto con ID {item.ProductoId} no encontrado.");

                if (producto.Inventario < item.Cantidad)
                    return BadRequest($"Stock insuficiente para {producto.Nombre}. Disponible: {producto.Inventario}");

 
                producto.Inventario -= item.Cantidad;
            }

            await _context.SaveChangesAsync();
            await transaction.CommitAsync();

            await _hubContext.Clients.All.SendAsync("InventarioActualizado");

            return Ok(new { mensaje = "Venta procesada con éxito" });
        }
        catch (Exception)
        {
            await transaction.RollbackAsync();
            return StatusCode(500, "Ocurrió un error al procesar la venta.");
        }
    }
}
