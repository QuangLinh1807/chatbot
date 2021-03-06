namespace Databay.Chatbot.Identity.Api.Configuration
{
    /// <summary>
    /// This class is automatically populated by .Net Core Depenceny Injection with "appsettings.json" values
    /// Please refer to the following link for further information
    /// https://docs.microsoft.com/en-us/aspnet/core/fundamentals/dependency-injection
    /// </summary>
    public class ConfigurationOptions
    {
        public string MongoConnection { get; set; }
        public string MongoDatabaseName { get; set; }
	    public string IdentityUrl { get; set; }
        public string HomepageUrl { get; set; }
    }
}
