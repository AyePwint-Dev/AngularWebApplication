using AngularWebApplication1.Server.Entities;
using AngularWebApplication1.Server.Interfaces;
using AngularWebApplication1.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AngularWebApplication1.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductRepository _ProductRepository;

        private static readonly List<Product> productList = new List<Product>
        {
            new Product { Id = 1, Name = "iPhone 15 Pro", Price = 1399.00m },
            new Product { Id = 2, Name = "Samsung Galaxy S23", Price = 1249.00m },
            new Product { Id = 3, Name = "MacBook Pro 16", Price = 3499.00m },
            new Product { Id = 4, Name = "Sony WH-1000XM5", Price = 469.00m },
            new Product { Id = 5, Name = "Dell XPS 15", Price = 2399.00m },
            new Product { Id = 6, Name = "Apple Watch Ultra", Price = 1079.00m },
            new Product { Id = 7, Name = "Google Pixel 8", Price = 949.00m },
            new Product { Id = 8, Name = "Amazon Echo Dot", Price = 79.00m },
            new Product { Id = 9, Name = "iPad Pro 12.9", Price = 1499.00m },
            new Product { Id = 10, Name = "Nikon Z8", Price = 5399.00m }

        };
        public ProductController(IProductRepository productRepository)
        {
            _ProductRepository = productRepository;
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> Get(int id)
        {
            var result = await _ProductRepository.GetById(id);
            return result;
        }
        [HttpGet]
        public async Task<IEnumerable<Product>> Get()
        {            
            var result = await _ProductRepository.GetAll();
            return result;
        }

        [HttpPut]
        public async Task<bool> Put([FromBody] ProductModel model)
        {
            var result = await _ProductRepository.UpdateProduct(model);
            return result > 0;
        }

        [HttpPost]
        public async Task<bool> Post([FromBody] ProductModel model)
        {
            var result = await _ProductRepository.AddProduct(model);
            return result > 0;
        }

        [HttpDelete("{id}")]
        public async Task<bool> Delete(int id)
        {
            var result = await _ProductRepository.DeleteProduct(id);
            return result > 0;
        }
    }
}
