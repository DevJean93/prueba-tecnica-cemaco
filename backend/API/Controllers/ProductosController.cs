using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using backend.Core.Interfaces;
using backend.Core.Entities;
using backend.API.DTOs;
using backend.Hubs;

namespace backend.API.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize]
public class ProductosController : ControllerBase
{
    private readonly IProductRepository _repository;
    private readonly IHubContext<InventoryHub> _hubContext;

    public ProductosController(IProductRepository repository, IHubContext<InventoryHub> hubContext)
    {
        _repository = repository;
        _hubContext = hubContext;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<ProductosDto>>> GetProductos()
    {
        var productos = await _repository.GetAllAsync();

        var productosDto = productos.Select(p => new ProductosDto
        {
            Id = p.Id,
            Nombre = p.Nombre,
            Descripcion = p.Descripcion,
            Precio = p.Precio,
            SKU = p.SKU,
            Inventario = p.Inventario,
            Imagen = p.Imagen
        });

        return Ok(productosDto);
    }

    [AllowAnonymous]
    [HttpGet("public")]
    public async Task<ActionResult<IEnumerable<ProductosDto>>> GetPublicProductos()
    {
        var productos = await _repository.GetPublicProductsAsync();

        var productosDto = productos.Select(p => new ProductosDto
        {
            Id = p.Id,
            Nombre = p.Nombre,
            Descripcion = p.Descripcion,
            Precio = p.Precio,
            SKU = p.SKU,
            Inventario = p.Inventario,
            Imagen = p.Imagen
        });

        return Ok(productosDto);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<ProductosDto>> GetProducto(int id)
    {
        var producto = await _repository.GetByIdAsync(id);

        if (producto == null) return NotFound();

        return Ok(new ProductosDto
        {
            Id = producto.Id,
            Nombre = producto.Nombre,
            Descripcion = producto.Descripcion,
            Precio = producto.Precio,
            SKU = producto.SKU,
            Inventario = producto.Inventario,
            Imagen = producto.Imagen
        });
    }

    [Authorize(Roles = "Administrador")]
    [HttpPost]
    public async Task<ActionResult<ProductosDto>> CreateProducto(ProductoCreateUpdateDto productoDto)
    {
        var nuevoProducto = new Producto
        {
            Nombre = productoDto.Nombre,
            Descripcion = productoDto.Descripcion,
            Precio = productoDto.Precio,
            SKU = productoDto.SKU,
            Inventario = productoDto.Inventario,
            Imagen = productoDto.Imagen
        };

        var productoCreado = await _repository.AddAsync(nuevoProducto);

        var dtoCreado = new ProductosDto
        {
            Id = productoCreado.Id,
            Nombre = productoCreado.Nombre,
            Descripcion = productoCreado.Descripcion,
            Precio = productoCreado.Precio,
            SKU = productoCreado.SKU,
            Inventario = productoCreado.Inventario,
            Imagen = productoCreado.Imagen
        };

        await _hubContext.Clients.All.SendAsync("InventarioActualizado");

        return CreatedAtAction(nameof(GetProducto), new { id = productoCreado.Id }, dtoCreado);
    }

    [Authorize(Roles = "Administrador, Colaborador")]
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateProducto(int id, ProductoCreateUpdateDto productoDto)
    {
        var productoExistente = await _repository.GetByIdAsync(id);
        if (productoExistente == null) return NotFound();

        productoExistente.Nombre = productoDto.Nombre;
        productoExistente.Descripcion = productoDto.Descripcion;
        productoExistente.Precio = productoDto.Precio;
        productoExistente.SKU = productoDto.SKU;
        productoExistente.Inventario = productoDto.Inventario;
        productoExistente.Imagen = productoDto.Imagen;

        await _repository.UpdateAsync(productoExistente);

        await _hubContext.Clients.All.SendAsync("InventarioActualizado");

        return NoContent();
    }

    [Authorize(Roles = "Administrador")]
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteProducto(int id)
    {
        var producto = await _repository.GetByIdAsync(id);
        if (producto == null) return NotFound();

        await _repository.DeleteAsync(id);

        await _hubContext.Clients.All.SendAsync("InventarioActualizado");

        return NoContent();
    }
}