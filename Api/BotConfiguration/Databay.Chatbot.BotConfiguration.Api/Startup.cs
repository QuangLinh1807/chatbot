using System.IdentityModel.Tokens.Jwt;
using AutoMapper;
using Databay.Chatbot.BotConfiguration.Api.Data;
using Databay.Chatbot.BotConfiguration.Api.Interfaces;
using Databay.Chatbot.BotConfiguration.Api.Model;
using Databay.Chatbot.BotConfiguration.Api.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Databay.Chatbot.BotConfiguration.Api
{
	public class Startup
	{
		public Startup(IConfiguration configuration)
		{
			Configuration = configuration;
		}

		public IConfiguration Configuration { get; }

		// This method gets called by the runtime. Use this method to add services to the container.
		public void ConfigureServices(IServiceCollection services)
		{
			services.AddMvc();
			services.AddCors(options =>
			{
				options.AddPolicy("CorsPolicy",
					builder => builder.AllowAnyOrigin()
					.AllowAnyMethod()
					.AllowAnyHeader()
					.AllowCredentials());
			});

			ConfigureAuthService(services);

			services.Configure<Settings>(options =>
			{
				options.ConnectionString = Configuration.GetSection("MongoConnection:ConnectionString").Value;
				options.Database = Configuration.GetSection("MongoConnection:Database").Value;
			});

			services.AddTransient<IIntentRepository, IntentRepository>();
			services.AddTransient<IBotRepository, BotRepository>();
			services.AddTransient<IPatternRepository, PatternRepository>();
			services.AddTransient<IResponseRepository, ResponseRepository>();
			services.AddTransient<IMongoDbHelperService, MongoDbHelperService>();
			services.AddTransient<IEntityRepository, EntityRepository>();
			services.AddTransient<IEntityTypeRepository, EntityTypeRepository>();
			services.AddTransient<IResponseDetailRepository, ResponseDetailRepository>();
			services.AddAutoMapper();
		}

		// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
		public void Configure(IApplicationBuilder app, IHostingEnvironment env)
		{
			app.UseCors("CorsPolicy");

			if (env.IsDevelopment())
			{
				app.UseDeveloperExceptionPage();

			}

			app.UseAuthentication();
			app.UseMvc();
            app.UseStaticFiles();
        }


		/// <summary>
		/// Configures the authentication service.
		/// </summary>
		/// <param name="services">The services.</param>
		private void ConfigureAuthService(IServiceCollection services)
		{
			// prevent from mapping "sub" claim to nameidentifier.
			JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Clear();

			// Identity Server
			services.AddAuthentication(options =>
			{
				options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
				options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;

			}).AddIdentityServerAuthentication(options =>
			{
				options.Authority = Configuration.GetValue<string>("IdentityUrl");
				options.ApiName = "chatbot.api.profile";
				options.RequireHttpsMetadata = false;
				options.ApiSecret = "secret";
			});
		}
	}
}
 