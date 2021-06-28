using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using System.Security.Claims;
using System.Threading.Tasks;
using Databay.Chatbot.Identity.Api.Models;
using IdentityModel;
using IdentityServer4.Models;
using IdentityServer4.Validation;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using Microsoft.AspNetCore.Identity;

namespace Databay.Chatbot.Identity.Api.Identity.Extension
{
	public class ResourceOwnerPasswordValidator : IResourceOwnerPasswordValidator
	{
		private readonly UserManager<ApplicationUser> _userManager;
		private readonly int _iterCount;

		public ResourceOwnerPasswordValidator(UserManager<ApplicationUser> userManager)
		{
			_userManager = userManager;
		}

		public async Task ValidateAsync(ResourceOwnerPasswordValidationContext context)
		{
			// get user from username & password
			var user = await _userManager.FindByNameAsync(context.UserName);

			if (user != null)
			{
				var validPassword = CompareHashedPassword(user.PasswordHash, context.Password);
				if (validPassword)
				{
					context.Result = new GrantValidationResult(
						subject: user.Id,
						authenticationMethod: "custom",
						claims: new List<Claim>
						{
							new Claim(JwtClaimTypes.Name, user.UserName),
						});
				}
				else
				{
					//invalid password
					context.Result = new GrantValidationResult(TokenRequestErrors.InvalidGrant, "Incorrect password");
					return;
				}
			}
		}
		
		// COMPARE HASHED PASSWORD
		private bool CompareHashedPassword(string hashedPassword, string providedPassword)
		{
			byte[] hashedPassword1 = Convert.FromBase64String(hashedPassword);
			if (!VerifyHashedPasswordV3(hashedPassword1, providedPassword, out int iterCount))
				return false;
			return iterCount >= _iterCount;
		}

		private static bool VerifyHashedPasswordV3(byte[] hashedPassword, string password, out int iterCount)
		{
			iterCount = 0;
			try
			{
				KeyDerivationPrf prf = (KeyDerivationPrf)ReadNetworkByteOrder(hashedPassword, 1);
				iterCount = (int)ReadNetworkByteOrder(hashedPassword, 5);
				int length = (int)ReadNetworkByteOrder(hashedPassword, 9);
				if (length < 16)
					return false;
				byte[] salt = new byte[length];
				Buffer.BlockCopy((Array)hashedPassword, 13, (Array)salt, 0, salt.Length);
				int numBytesRequested = hashedPassword.Length - 13 - salt.Length;
				if (numBytesRequested < 16)
					return false;
				byte[] b = new byte[numBytesRequested];
				Buffer.BlockCopy((Array)hashedPassword, 13 + salt.Length, (Array)b, 0, b.Length);
				return ByteArraysEqual(Microsoft.AspNetCore.Cryptography.KeyDerivation.KeyDerivation.Pbkdf2(password, salt, prf, iterCount, numBytesRequested), b);
			}
			catch
			{
				return false;
			}
		}

		[MethodImpl(MethodImplOptions.NoInlining | MethodImplOptions.NoOptimization)]
		private static bool ByteArraysEqual(byte[] a, byte[] b)
		{
			if (a == null && b == null)
				return true;
			if (a == null || b == null || a.Length != b.Length)
				return false;
			bool flag = true;
			for (int index = 0; index < a.Length; ++index)
				flag &= (int)a[index] == (int)b[index];
			return flag;
		}

		private static uint ReadNetworkByteOrder(byte[] buffer, int offset)
		{
			return (uint)((int)buffer[offset] << 24 | (int)buffer[offset + 1] << 16 | (int)buffer[offset + 2] << 8) | (uint)buffer[offset + 3];
		}
	}
}
