using Common.DTO_s;
using Context;
using Microsoft.Extensions.DependencyInjection;
using Repository;
using Repository.Entities;
using Repository.Interfaces;
using Servies.Interfaces;
using Servies.Servies;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Servies
{
    public static class ServiceCollectionExtentions
    {
        public static IServiceCollection AddServices(this IServiceCollection services)
        {
            services.AddRepositories();
            services.AddScoped<IServices<SongDto>, SongServ>();
            services.AddScoped<IServices<SingerDto>, SingerServ>();
            services.AddSingleton<IContext, ChordsContext>();
            services.AddAutoMapper(typeof(MappingProfile));
            return services;
        }
    }
}
