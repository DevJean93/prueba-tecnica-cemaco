using backend.Core.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;

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
            if (!db.Productos.Any())
            {
                var jsonPath = Path.Combine(Directory.GetCurrentDirectory(), "Infraestructura", "Data", "productos.json");
                if (!File.Exists(jsonPath))
                {
                    Console.WriteLine("No se encontró el archivo productos.json en la ruta: " + jsonPath);
                    return;
                }

                var jsonData = await File.ReadAllTextAsync(jsonPath);

             
                var options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };

                var productos = JsonSerializer.Deserialize<List<Producto>>(jsonData, options);

                if (productos != null && productos.Any())
                {
                    var random = new Random();

                    foreach (var prod in productos)
                    {
                  
                        prod.Inventario = random.Next(0, 26);
                    }

                    await db.Productos.AddRangeAsync(productos);
                    await db.SaveChangesAsync();

                }
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error crítico durante el Seeding de la base de datos: {ex.Message}");
        }
    }
}