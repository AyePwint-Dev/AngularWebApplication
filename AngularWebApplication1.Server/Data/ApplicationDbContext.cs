using AngularWebApplication1.Server.Entities;
using Microsoft.EntityFrameworkCore;

namespace AngularWebApplication1.Server.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions options) : base(options)
        { }
        public DbSet<Product> Products { get; set; }
    }
}
