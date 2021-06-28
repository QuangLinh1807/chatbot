using System.Net.Http;
using Databay.Chatbot.Identity.Api.Identity.ExtensionGrant;
using Databay.Chatbot.Identity.Api.Identity.Interface;
using Databay.Chatbot.Identity.Api.Identity.Interface.Processors;
using Databay.Chatbot.Identity.Api.Identity.Processors;
using Databay.Chatbot.Identity.Api.Identity.Providers;
using Databay.Chatbot.Identity.Api.Identity.Repository;
using Databay.Chatbot.Identity.Api.Identity.Repository.Interfaces;
using IdentityServer4.Validation;
using Microsoft.AspNetCore.Identity.MongoDB;
using Microsoft.Extensions.DependencyInjection;

namespace Databay.Chatbot.Identity.Api.Identity.Extension
{
	public static class ServiceCollectionExtensions
	{
		public static IServiceCollection AddIdentityServerConfig(this IServiceCollection services)
		{
			//services.AddIdentityServer()
			//    .AddDeveloperSigningCredential()
			//   .AddInMemoryApiResources(Config.GetApiResources())
			//   .AddInMemoryClients(Config.GetClients())
			//   .AddInMemoryIdentityResources(Config.GetIdentityResources())
			//   .AddAspNetIdentity<ApplicationUser>();

			return services;
		}

		public static IServiceCollection AddServices<TUser>(this IServiceCollection services) where TUser : IdentityUser, new()
		{
			services.AddScoped<INonEmailUserProcessor, NonEmailUserProcessor<TUser>>();
			services.AddScoped<IEmailUserProcessor, EmailUserProcessor<TUser>>();
			services.AddScoped<IExtensionGrantValidator, ExternalAuthenticationGrant<TUser>>();
			services.AddSingleton<HttpClient>();
			return services;
		}

		public static IServiceCollection AddRepositories(this IServiceCollection services)
		{
			services.AddScoped<IProviderRepository, ProviderRepository>();
			return services;
		}

		public static IServiceCollection AddProviders<TUser>(this IServiceCollection services) where TUser : IdentityUser, new()
		{
			services.AddTransient<IFacebookAuthProvider, FacebookAuthProvider<TUser>>();
			services.AddTransient<ITwitterAuthProvider, TwitterAuthProvider<TUser>>();
			services.AddTransient<IGoogleAuthProvider, GoogleAuthProvider<TUser>>();
			services.AddTransient<ILinkedInAuthProvider, LinkedInAuthProvider<TUser>>();
			services.AddTransient<IGitHubAuthProvider, GitHubAuthProvider<TUser>>();
			return services;
		}
	}
}
