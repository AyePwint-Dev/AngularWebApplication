using AngularWebApplication1.Server.Data;
using AngularWebApplication1.Server.Entities;
using AngularWebApplication1.Server.Interfaces;
using AngularWebApplication1.Server.Models;

namespace AngularWebApplication1.Server.Repositories
{
    public class ProductRepository : GenericRepository<Product>, IProductRepository
    {
        public ProductRepository(ApplicationDbContext context) : base(context)
        {
        }

        async Task<int> IProductRepository.AddProduct(ProductModel Productmodel)
        {
            Product product = new Product { 
                Name = Productmodel.Name,
                Price = Productmodel.Price
            };
            var result = await Add(product);
            return result;
        }
        async Task<IEnumerable<Product>> IProductRepository.GetList()
        {
            return await GetAll();
        }


        async Task<int> IProductRepository.DeleteProduct(int id)
        {
            var Productitem = await GetById(id);
            var result = await Remove(Productitem);
            return result;
        }

       
        async Task<Product> IProductRepository.GetProduct(int id)
        {
            var Productitem = await GetById(id);
            return Productitem;
        }

        async Task<int> IProductRepository.UpdateProduct(ProductModel model)
        {
            var Productitem = await GetById(model.Id);
            Productitem.Name = model.Name;
            Productitem.Price = model.Price;
            var result = await Update(Productitem);
            return result;
        }
    }
}
