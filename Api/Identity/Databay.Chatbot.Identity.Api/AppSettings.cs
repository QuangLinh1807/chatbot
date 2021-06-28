namespace Databay.Chatbot.Identity.Api
{
    /// <summary>
    /// Class AppSettings.
    /// </summary>
    public class AppSettings
    {
        /// <summary>
        /// Gets or sets a value indicating whether [use customization data].
        /// </summary>
        /// <value><c>true</c> if [use customization data]; otherwise, <c>false</c>.</value>
        public bool UseCustomizationData { get; set; }

        /// <summary>
        /// Gets or sets the send grid user.
        /// </summary>
        /// <value>The send grid user.</value>
        public string SendGridUser { get; set; }

        /// <summary>
        /// Gets or sets the send grid key.
        /// </summary>
        /// <value>The send grid key.</value>
        public string SendGridKey { get; set; }

        public string SendGridTemplate { get; set; }
        public string EmailSender { get; set; }
        public string EmailName { get; set; }
    }
}
