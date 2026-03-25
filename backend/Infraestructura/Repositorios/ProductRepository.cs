using backend.Core.Entities;
using backend.Core.Interfaces;
using backend.Infraestructura.Data;
using Microsoft.EntityFrameworkCore;

namespace backend.Infraestructura.Repositorios
{
    public class ProductRepository : IProductRepository
    {
        private readonly AppDbContext _context;

        public ProductRepository(AppDbContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<Producto>> GetAllAsync()
        {
            return await _context.Productos.ToListAsync();
        }

        public async Task<IEnumerable<Producto>> GetPublicProductsAsync()
        {
            return await _context.Productos
                .Where(p => p.Inventario > 5)
                .ToListAsync();
        }

        public async Task<Producto?> GetByIdAsync(int id)
        {
            return await _context.Productos.FindAsync(id);
        }

        public async Task<Producto> AddAsync(Producto producto)
        {
            _context.Productos.Add(producto);
            await _context.SaveChangesAsync();
            return producto;
        }

        public async Task UpdateAsync(Producto producto)
        {
            _context.Entry(producto).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var producto = await _context.Productos.FindAsync(id);
            if (producto != null)
            {
                _context.Productos.Remove(producto);
                await _context.SaveChangesAsync();
            }
        }
    }
}
