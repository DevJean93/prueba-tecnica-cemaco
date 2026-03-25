using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using backend.Core.Entities;

namespace backend.Infraestructura.Data;

public static class DbSeeder
{
    public static async Task SeedAsync(AppDbContext db, UserManager<IdentityUser> userManager, RoleManager<IdentityRole> roleManager)
    {
        try
        {
            Console.WriteLine("Aplicando migraciones y preparando la base de datos...");

            await db.Database.EnsureDeletedAsync();
            await db.Database.MigrateAsync();

            // --- 1. SEEDING DE ROLES ---
            string[] roles = { "Administrador", "Colaborador" };
            foreach (var rol in roles)
            {
                if (!await roleManager.RoleExistsAsync(rol))
                {
                    await roleManager.CreateAsync(new IdentityRole(rol));
                }
            }

            // --- 2. SEEDING DE USUARIOS ---
            if (await userManager.FindByEmailAsync("admin@cemaco.com") == null)
            {
                var admin = new IdentityUser { UserName = "admin@cemaco.com", Email = "admin@cemaco.com" };
                await userManager.CreateAsync(admin, "Admin123!");
                await userManager.AddToRoleAsync(admin, "Administrador");
            }

            if (await userManager.FindByEmailAsync("colab@cemaco.com") == null)
            {
                var colab = new IdentityUser { UserName = "colab@cemaco.com", Email = "colab@cemaco.com" };
                await userManager.CreateAsync(colab, "Colab123!");
                await userManager.AddToRoleAsync(colab, "Colaborador");
            }

            // --- 3. SEEDING DE PRODUCTOS ---
            if (!await db.Productos.AnyAsync())
            {
                var productosIniciales = new List<Producto>
                {
                    new Producto
                    {
                        Nombre = "Sartén T-fal Initiatives de 24cm",
                        Descripcion = "Sartén antiadherente con tecnología Thermo-Spot.",
                        Precio = 199.00m,
                        SKU = "TFA-INT-24",
                        Inventario = 25, 
                        Imagen = "https://cemacogt.vtexassets.com/arquivos/ids/2918259-300-300?v=638756866203570000&width=300&height=300&aspect=true"
                    },
                    new Producto
                    {
                        Nombre = "Olla Arrocera Oster de 10 Tazas",
                        Descripcion = "Olla con función automática para mantener el arroz caliente.",
                        Precio = 349.00m,
                        SKU = "OST-ARR-10T",
                        Inventario = 12, 
                        Imagen = "https://cemacogt.vtexassets.com/arquivos/ids/2918259-300-300?v=638756866203570000&width=300&height=300&aspect=true"
                    },
                    new Producto
                    {
                        Nombre = "Batería de Cocina Tramontina 7 Pz",
                        Descripcion = "Juego completo de aluminio con revestimiento antiadherente.",
                        Precio = 899.00m,
                        SKU = "TRA-BAT-7PZ",
                        Inventario = 8,
                        Imagen = "https://cemacogt.vtexassets.com/arquivos/ids/2918259-300-300?v=638756866203570000&width=300&height=300&aspect=true"
                    },
                    new Producto
                    {
                        Nombre = "Sartén de Hierro Fundido Lodge 10\"",
                        Descripcion = "Sartén pre-sazonado ideal para retener el calor.",
                        Precio = 275.00m,
                        SKU = "LOD-HIE-10P",
                        Inventario = 3,
                        Imagen = "https://cemacogt.vtexassets.com/arquivos/ids/2918259-300-300?v=638756866203570000&width=300&height=300&aspect=true"
                    },
                    new Producto
                    {
                        Nombre = "Cacerola con Tapa de Vidrio 2L",
                        Descripcion = "Cacerola de acero inoxidable de alta calidad.",
                        Precio = 150.00m,
                        SKU = "GEN-CAC-2LT",
                        Inventario = 0,
                        Imagen = "https://cemacogt.vtexassets.com/arquivos/ids/2918259-300-300?v=638756866203570000&width=300&height=300&aspect=true"
                    }
                };

                await db.Productos.AddRangeAsync(productosIniciales);
                await db.SaveChangesAsync();
                Console.WriteLine("Poblado de productos VTEX completado exitosamente.");
            
            Console.WriteLine("Seeding completado exitosamente.");
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error crítico durante el Seeding de la base de datos: {ex.Message}");
        }
    }
}