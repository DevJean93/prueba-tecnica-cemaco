using backend.Core.Entities;

namespace backend.Core.Interfaces
{
    public interface IProductRepository
    {
   
        Task<IEnumerable<Producto>> GetAllAsync();

        Task<IEnumerable<Producto>> GetPublicProductsAsync();

        Task<Producto?> GetByIdAsync(int id);

        Task<Producto> AddAsync(Producto producto);

        Task UpdateAsync(Producto producto);

        Task DeleteAsync(int id);
    }
}
