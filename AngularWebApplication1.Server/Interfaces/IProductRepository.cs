using AngularWebApplication1.Server.Entities;
using AngularWebApplication1.Server.Models;

namespace AngularWebApplication1.Server.Interfaces
{
    public interface IProductRepository : IGenericRepository<Product>
    {
        Task<IEnumerable<Product>> GetList();
        Task<Product> GetProduct(int id);
        Task<int> AddProduct(ProductModel Productmodel);
        Task<int> UpdateProduct(ProductModel Productmodel);
        Task<int> DeleteProduct(int id);

    }
}
