using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Databay.Chatbot.BotConfiguration.Api.Controllers
{

	[Authorize]
	[Produces("application/json")]
	[Route("api/v1/[controller]")]
	[Consumes("application/json", "application/json-patch+json", "multipart/form-data")]
	public class FileApiController : ApiController
	{
		[HttpPost]
		[Route("upload-file")]
		public async Task<IActionResult> UploadFileByUser(List<IFormFile> file)
		{
            var urlPath = new List<string>();
            foreach (var formFile in file)
            {

                if (formFile != null)
                {
                    //var directory = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/uploadFiles", UserId.ToString());
                    //string extention = Path.GetExtension(file.FileName);
                    //string fileName = Path.GetFileNameWithoutExtension(file.FileName);
                    //string fileNameCopy = fileName;
                    //int attempt = 1;
                    //while (!CheckFileExists(GetRequest(directory + "//" + fileNameCopy + extention)))
                    //{
                    //    fileNameCopy = fileName + " (" + attempt.ToString() + ")";
                    //    attempt++;
                    //}
                    //var fullPath = Path.Combine(directory, fileNameCopy + extention);
                    //urlPath = $"/uploadFiles/{UserId.ToString()}/{fileNameCopy + extention}";

                    var fileName = $"{Path.GetFileNameWithoutExtension(formFile.FileName)}_{Guid.NewGuid()}{Path.GetExtension(formFile.FileName)}";

                    var fullPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/uploadFiles", UserId.ToString(), fileName);
                    urlPath.Add($"/uploadFiles/{UserId.ToString()}/{fileName}");

                    Directory.CreateDirectory(Path.GetDirectoryName(fullPath));
                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        await formFile.CopyToAsync(stream);
                    }
                }
            }

			return Response(string.Join(",", urlPath.ToArray()));
		}

        private FtpWebRequest GetRequest(string uriString)
        {
            var request = (FtpWebRequest)WebRequest.Create(uriString);
            request.Credentials = new NetworkCredential("", "");
            request.Method = WebRequestMethods.Ftp.GetFileSize;

            return request;
        }

        private bool CheckFileExists(WebRequest request)
        {
            try
            {
                request.GetResponse();
                return true;
            }
            catch
            {
                return false;
            }
        }
    }
}
