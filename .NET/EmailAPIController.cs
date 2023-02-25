using Microsoft.AspNetCore.Mvc;
using Sabio.Models.Domain;
using Sabio.Web.Controllers;
using Sabio.Web.Models.Responses;
using System;
using Sabio.Services;
using Microsoft.Extensions.Logging;
using Sabio.Services.Interfaces;

namespace Sabio.Web.Api.Controllers
{
    [Route("api/emails")]
    [ApiController]
    public class EmailApiController : BaseApiController
    {
        private IEmailService _service = null; 
        private IAuthenticationService<int> _authService = null;
  
        public EmailApiController(
            IEmailService service,
            ILogger<EmailApiController> logger,
            IAuthenticationService<int> authService) : base(logger)
        {
            _service = service;
            _authService = authService;
        }


        [HttpPost]
        public ActionResult<SuccessResponse> SendEmail()
        {
            ObjectResult result = null;

            try
            {

                string to = "tester@dispostable.com";
                _service.TestEmail(to);
           
                SuccessResponse response = new SuccessResponse();
                result = StatusCode(200, response);
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.ToString());
                ErrorResponse response = new ErrorResponse("Exception when calling EmailCampaignsApi: " + ex.Message);

                result = StatusCode(500, response);
            }

            return result;
        }


        [HttpPost("contactus")]
        public ActionResult<SuccessResponse> ContactUs(ContactUs model)
        {
            ObjectResult result = null;
            
            try
            {
                _service.ContactAdmin(model);
                _service.ConfirmationEmail(model);

                SuccessResponse response = new SuccessResponse();
                result = StatusCode(200, response);
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.ToString());
                ErrorResponse response = new ErrorResponse("Exception when calling EmailCampaignsApi: " + ex.Message);
            }
            return result;
        }
    }
}

