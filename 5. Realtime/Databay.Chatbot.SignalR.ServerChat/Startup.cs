using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using Databay.Chatbot.SignalR.ServerChat.Code;
using Microsoft.Extensions.FileProviders;
using System.IO;
using Databay.Chatbot.SignalR.ServerChat.Hubs;

namespace Databay.Chatbot.SignalR.ServerChat
{
    public class Startup
    {
        public IConfiguration Configuration { get; }

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            //services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);

            services.AddCors(options => options.AddPolicy("CorsPolicy",
            builder =>
            {
                builder
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    //.AllowAnyOrigin()
                    .SetIsOriginAllowed((host) => true)
                    .AllowCredentials();
            }));

            services.AddSignalR();

            services.Configure<AppSettings>(Configuration.GetSection("AppSettings"));
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();
            //app.UseMvc();
            //app.UseStaticFiles();
            app.UseStaticFiles(new StaticFileOptions
            {
                FileProvider = new PhysicalFileProvider(
                    Path.Combine(Directory.GetCurrentDirectory(), "Content")),
                RequestPath = "/Content"
            });

            app.UseCors("CorsPolicy");

            app.UseSignalR(route =>
            {
                route.MapHub<ChatHub>("/chathub");
            });
        }
    }
}
