using System;
using Databay.Chatbot.Identity.Api.Configuration;
using Databay.Chatbot.Identity.Api.Identity.Extension;
using Databay.Chatbot.Identity.Api.Models;
using Databay.Chatbot.Identity.Api.Services;
using IdentityServer4.Services;
using IdentityServer4.Validation;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity.MongoDB;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Serilog;

namespace Databay.Chatbot.Identity.Api
{
    public class Startup
    {
        public IConfigurationRoot Configuration { get; }

        public Startup(ILoggerFactory loggerFactory, IHostingEnvironment env)
        {
            var environmentVar = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");
            if (environmentVar == null)
            {
                environmentVar = env.EnvironmentName;
            }
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .AddJsonFile($"appsettings.{environmentVar}.json", optional: true)
                //.AddJsonFile("ocelot.json")
                .AddEnvironmentVariables();
            Configuration = builder.Build();

            //--- Configure Serilog ---
            var serilog = new LoggerConfiguration()
                                .ReadFrom.Configuration(Configuration);

            loggerFactory.WithFilter(new FilterLoggerSettings
                        {
                            { "IdentityServer", LogLevel.Error },
                            { "Microsoft", LogLevel.Error },
                            { "System", LogLevel.Error },
                        })
                        .AddSerilog(serilog.CreateLogger());
        }


        public void ConfigureServices(IServiceCollection services)
        {
            //services.AddOcelot(Configuration);
            services.AddSingleton<IProfileService, ProfileService>();
            services.AddMvc();

            // Dependency Injection - Register the IConfigurationRoot instance mapping to our "ConfigurationOptions" class 
            services.Configure<ConfigurationOptions>(Configuration);

            // ---  configure identity server with MONGO Repository for stores, keys, clients, scopes & Asp .Net Identity  ---
            services.AddIdentityServer(
                    // Enable IdentityServer events for logging capture - Events are not turned on by default
                    options =>
                    {
                        options.Events.RaiseSuccessEvents = true;
                        options.Events.RaiseFailureEvents = true;
                        options.Events.RaiseErrorEvents = true;
                    }
                )
                .AddTemporarySigningCredential()
                .AddMongoRepository()
                .AddMongoDbForAspIdentity<ApplicationUser, IdentityRole>(Configuration)
                .AddClients()
                .AddIdentityApiResources()
                .AddPersistedGrants()
                .AddProfileService<ProfileService>();

            services.AddIdentity<ApplicationUser, IdentityRole>(config =>
            {
                config.SignIn.RequireConfirmedEmail = true;
                config.SignIn.RequireConfirmedPhoneNumber = false;
            })
                .AddDefaultTokenProviders();

            services.AddServices<ApplicationUser>()
                .AddRepositories()
                .AddProviders<ApplicationUser>();

            // validate resources
            services.AddTransient<IResourceOwnerPasswordValidator, ResourceOwnerPasswordValidator>();

            //add services
            services.AddTransient<IEmailSender, EmailSender>();

            //configuration settings
            services.Configure<AppSettings>(Configuration);

            //services.AddCors();

            //services.AddCors(options =>
            //{
            //    options.AddPolicy("CorsPolicy",
            //        builder => builder.AllowAnyOrigin()
            //        .AllowAnyMethod()
            //        .AllowAnyHeader()
            //        .AllowCredentials()
            //        );
            //});

            //services.AddCors(options => options.AddPolicy("CorsPolicy",
            //builder =>
            //{
            //    builder
            //        .AllowAnyMethod()
            //        .AllowAnyHeader()
            //        //.AllowAnyOrigin()
            //        .SetIsOriginAllowed((host) => true)
            //        .AllowCredentials();
            //}));

        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole(LogLevel.Debug);

            Log.Information("IdentityServer4.Configure was executed...");

            app.UseDeveloperExceptionPage();

            //app.UseAuthentication();
            app.UseIdentityServer();
            app.UseMongoDbForIdentityServer();
            app.UseIdentity();

            app.UseCors(x => x
                .AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader());

            //app.UseCors("CorsPolicy");

            //app.UseCors(b => b.WithOrigins("http://localhost:5000", "http://localhost:3009")
            //    .AllowAnyOrigin()
            //    .AllowCredentials()
            //    .AllowAnyMethod()
            //    .AllowAnyHeader());

            // Configure Google Auth
            //app.UseGoogleAuthentication(new GoogleOptions
            //{
            //	AuthenticationScheme = "Google",
            //	DisplayName = "Google",
            //	SignInScheme = IdentityServerConstants.ExternalCookieAuthenticationScheme,

            //	ClientId = "434483408261-55tc8n0cs4ff1fe21ea8df2o443v2iuc.apps.googleusercontent.com",
            //	ClientSecret = "3gcoTrEDPPJ0ukn_aYYT6PWo",
            //	Scope = { "openid", "profile", "email" }
            //});

            app.UseStaticFiles();
            app.UseMvcWithDefaultRoute();

        }
    }
}