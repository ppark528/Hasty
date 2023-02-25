using Google.Apis.AnalyticsReporting.v4.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Sabio.Models.Requests;
using Sabio.Services;
using Sabio.Services.Interfaces;
using Sabio.Web.Controllers;
using Sabio.Web.Models.Responses;
using System;

namespace Sabio.Web.Api.Controllers
{
    [Route("api/googleanalytics")]
    [ApiController]
    public class GoogleAnalyticsApiController : BaseApiController
    {
        private IGoogleAnalyticsService _service = null;
        private IAuthenticationService<int> _authService = null;

        public GoogleAnalyticsApiController(IGoogleAnalyticsService service,
            ILogger<GoogleAnalyticsApiController> logger,
            IAuthenticationService<int> authService) : base(logger)
        {
            _service = service;
            _authService = authService;
        }

        [HttpPost("data")]
        public ActionResult<ItemResponse<GetReportsResponse>> GetReport(GoogleAnalyticsRequest model)
        {
            int code = 200;
            BaseResponse response = null;
            try
            {
                GetReportsResponse report = _service.GetAnalyticsReport(model);
                
                if (report == null)
                {
                    code = 404;
                    response = new ErrorResponse("Analytics not found.");
                }
                else
                {
                    response = new ItemResponse<GetReportsResponse>() { Item = report };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                base.Logger.LogError(ex.ToString());
                response = new ErrorResponse($"Generic Error: {ex.Message}");
            }
            return StatusCode(code, response);
        }
    }

}
