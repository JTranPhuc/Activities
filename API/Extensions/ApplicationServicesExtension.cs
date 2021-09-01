using Application.Activities;
using Application.ClientModels;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;
using Persistence;

namespace API.Extensions
{
    public static class ApplicationServicesExtension
    {
        public static IServiceCollection GetServiceCollection(this IServiceCollection services, IConfiguration config)
        {

            services.AddSwaggerGen(c =>
                        {
                            c.SwaggerDoc("v1", new OpenApiInfo { Title = "API", Version = "v1" });
                        });

            services.AddDbContext<DataContext>(opts =>
            {
                opts.UseSqlite(config.GetConnectionString("DefaultConnection"));
            });

            services.AddCors(cors =>
            {
                cors.AddPolicy("CorsPolicy", policy =>
                {
                    policy.AllowAnyMethod().AllowAnyHeader().AllowAnyOrigin();//"http://localhost:3000/"
                });
            });

            services.AddMediatR(typeof(List.Handler).Assembly);
            services.AddAutoMapper(typeof(MappingProfiles).Assembly);

            return services;
        }
    }
}