// ***********************************************************************
// Assembly         : Buca.Golfy.Api.Identity
// Author           : thangnd
// Created          : 05-14-2018
//
// Last Modified By : thangnd
// Last Modified On : 05-14-2018
// ***********************************************************************
// <copyright file="EmailSenderExtensions.cs" company="Buca.Golfy.Api.Identity">
//     Copyright (c) by adguard. All rights reserved.
// </copyright>
// <summary></summary>
// ***********************************************************************

using System;
using System.Text.Encodings.Web;
using System.Threading.Tasks;
using Databay.Chatbot.Identity.Api.Services;
using Microsoft.AspNetCore.Cors;

namespace Databay.Chatbot.Identity.Api.Extenstions
{
    /// <summary>
    /// Class EmailSenderExtensions.
    /// </summary>
    //[EnableCors("CorsPolicy")]
    public static class EmailSenderExtensions
    {
        /// <summary>
        /// Sends the email confirmation asynchronous.
        /// </summary>
        /// <param name="emailSender">The email sender.</param>
        /// <param name="email">The email.</param>
        /// <param name="link">The link.</param>
        /// <returns>Task.</returns>
        /// return 
        public static Task SendEmailConfirmationAsync(this IEmailSender emailSender, string email, string displayName, string link)
        {
            // get email
            //var emailName = email.Substring(0, email.IndexOf("@"));
            return emailSender.SendEmailAsync(email, "Xác nhận đăng ký tài khoản",
                $"<div style='letter-spacing: 0px;line-height: 20px;color: rgb(41,41,42);padding-left: 13.3%; padding-right: 13.3%;'><p style='font-weight:600;text-align: left;margin-bottom: 30px;font-size: 16px;font-family: Roboto;'>Chào {displayName}</p><p style='text-align: left;margin-bottom: 15px;font-size: 14px;font-family: Roboto;text-align: justify;'>Databay.ai trân trọng thông báo bạn đã đăng ký thành công tài khoản trên hệ thống của chúng tôi. Bạn vui lòng đăng nhập hệ thống với tài khoản \"{email}\"</p><p style='text-align: left; margin-bottom: 35px;font-size: 14px;font-family: Roboto;text-align: justify;'>Bạn cần xác nhận địa chỉ email này trong vòng 24h để sử dụng dịch vụ của chúng tôi. Nếu có bất cứ câu hỏi nào, vui lòng liên hệ cới chúng tôi để nhận được sự trợ giúp.</p></div><div><a href='{HtmlEncoder.Default.Encode(link)}' style='text-align: center; border: 1px solid; padding: 10px 50px; background: #eb0f17; color: white; font-size: 14px; letter-spacing: 0px; line-height: 20px; color: rgb(255, 255, 255); text-decoration: none; font-family: Roboto;'>Xác nhận đăng ký</a></div>");
            
        }

        /// <summary>
        /// Sends the email reset password asynchronous.
        /// </summary>
        /// <param name="emailSender">The email sender.</param>
        /// <param name="email">The email.</param>
        /// <param name="link">The link.</param>
        /// <returns>Task.</returns>
        public static Task SendEmailResetPasswordAsync(this IEmailSender emailSender, string email, string link)
        {
            var emailName = email.Substring(0, email.IndexOf("@"));
            return emailSender.SendEmailAsync(email, "Khôi phục mật khẩu",
                $"<div style='letter-spacing: 0px;line-height: 20px;color: rgb(41,41,42);padding-left: 13.3%; padding-right: 13.3%;'><p style='font-weight:600;text-align: left;margin-bottom: 30px;font-size: 16px;font-family: Roboto;'>Chào {emailName}</p><p style='text-align: left;margin-bottom: 15px;font-size: 14px;font-family: Roboto;text-align: justify;'>Chúng tôi đã nhận được yêu cầu lấy lại mật khẩu để truy cập vào tài khoản Baybooking {email} thông qua địa chỉ email</p><p style='text-align: left; margin-bottom: 35px;font-size: 14px;font-family: Roboto;text-align: justify;'>Nếu bạn không yêu cầu mã này thì có thể là có ai đó đang cố truy cập vào tài khoản Baybooking của bạn. Đừng chuyển tiếp hoặc cung cấp email này cho bất kỳ ai.</ p></div><div><a href='{HtmlEncoder.Default.Encode(link)}' style='text-align: center; border: 1px solid; padding: 10px 50px; background: #eb0f17; color: white; font-size: 14px; letter-spacing: 0px; line-height: 20px; color: rgb(255, 255, 255); text-decoration: none; font-family: Roboto;'>Khôi phục mật khẩu</a></div>");
        }

        /// <summary>
        /// Sends the email reset password asynchronous.
        /// </summary>
        /// <param name="emailSender">The email sender.</param>
        /// <param name="email">The email.</param>
        /// <param name="link">The link.</param>
        /// <returns>Task.</returns>
        public static Task SendMailChangeEmailAsync(this IEmailSender emailSender, string email, string link)
        {
            var emailName = email.Substring(0, email.IndexOf("@"));
            return emailSender.SendEmailAsync(email, "Thay đổi địa chỉ email",
                $"<div style='letter-spacing: 0px;line-height: 20px;color: rgb(41,41,42);padding-left: 13.3%; padding-right: 13.3%;'><p style='font-weight:600;text-align: left;margin-bottom: 30px;font-size: 16px;font-family: Roboto;'>Chào {emailName}</p><p style='text-align: left;margin-bottom: 15px;font-size: 14px;font-family: Roboto;text-align: justify;'>Chúng tôi đã nhận được yêu cầu thay đổi email của tài khoản Baybooking {email}</p><p style='text-align: left; margin-bottom: 35px;font-size: 14px;font-family: Roboto;text-align: justify;'>Nếu bạn không yêu cầu mã này thì có thể là có ai đó đang cố truy cập vào tài khoản Baybooking của bạn. Đừng chuyển tiếp hoặc cung cấp email này cho bất kỳ ai.</ p></div><div><a href='{HtmlEncoder.Default.Encode(link)}' style='text-align: center; border: 1px solid; padding: 10px 50px; background: #eb0f17; color: white; font-size: 14px; letter-spacing: 0px; line-height: 20px; color: rgb(255, 255, 255); text-decoration: none; font-family: Roboto;'>Thay đổi email</a></div>");
        }

	    public static Task SendMailWelcome(this IEmailSender emailSender,string email, string name)
	    {
			// get email
		    return emailSender.SendEmailAsync(email, "Đăng ký tài khoản thành công",
			    $"<div style='letter-spacing: 0px;line-height: 20px;color: rgb(41,41,42);padding-left: 13.3%; padding-right: 13.3%;'><p style='font-weight:600;text-align: left;margin-bottom: 30px;font-size: 16px;font-family: Roboto;'>Chào {name}</p><p style='text-align: left;margin-bottom: 15px;font-size: 14px;font-family: Roboto;text-align: justify;'>Chúc mừng Anh/Chị đã đăng ký thành công hệ thống Bay Golf Booking. Anh/Chị vui lòng truy cập ứng dụng với tài khoản {email} bạn vui lòng xác nhận email để tiếp tục sử dụng dịch vụ của chúng tôi.</p><p style='text-align: left; margin-bottom: 35px;font-size: 14px;font-family: Roboto;text-align: justify;'>Chân thành cảm ơn bạn đã sử dụng dịch vụ đặt sân golf của chúng tôi.</p></div>");
		}
    }
}
