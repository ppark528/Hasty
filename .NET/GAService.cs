using Google.Apis.AnalyticsReporting.v4.Data;
using Google.Apis.AnalyticsReporting.v4;
using Google.Apis.Auth.OAuth2;
using System.IO;
using Microsoft.AspNetCore.Hosting;
using Sabio.Models.Domain;
using Microsoft.Extensions.Options;
using Sabio.Services.Interfaces;
using Google.Apis.Services;
using System.Collections.Generic;
using Newtonsoft.Json;
using Sabio.Models.Requests;

namespace Sabio.Services
{
    public class GoogleAnalyticsService : IGoogleAnalyticsService
    {
        private readonly IWebHostEnvironment _env;
        private GAServiceAccount _acc;
        private GoogleCredential _credential;
        private AnalyticsReportingService _client;

        public GoogleAnalyticsService(IOptions<GAServiceAccount> acc,
            IWebHostEnvironment env)
        {
            _env = env;
            _acc = acc.Value;
            string keyFilePath = Path.Combine(_env.WebRootPath, "GoogleAnalyticsApi", "googleanalytics_credentials.json");
            _credential = GoogleCredential.FromFile(keyFilePath).CreateScoped(new[] { AnalyticsReportingService.Scope.AnalyticsReadonly });
            _client = new AnalyticsReportingService(
                  new BaseClientService.Initializer
                  {
                      HttpClientInitializer = _credential
                  });
        }

        public GetReportsResponse GetAnalyticsReport(GoogleAnalyticsRequest model)
        {
            string viewIdPath = Path.Combine(_env.WebRootPath, "GoogleAnalyticsApi", "googleanalytics_credentials.json");
            string file = File.ReadAllText(viewIdPath);
            dynamic jsonFile = JsonConvert.DeserializeObject(file);
           
            string viewId = jsonFile.view_id;

            ReportRequest reportRequest = new ReportRequest
            {
                ViewId = viewId,
                DateRanges = new List<DateRange>
                {
                    new DateRange
                    {
                    StartDate = model.StartDate,
                    EndDate = model.EndDate,
                    }
                },
                Dimensions = model.Dimensions,
                Metrics = model.Metrics
            };

            List<ReportRequest> requests = new List<ReportRequest>();
            requests.Add(reportRequest);

            GetReportsRequest getReport = new GetReportsRequest() { ReportRequests = requests };
            GetReportsResponse response = _client.Reports.BatchGet(getReport).Execute();
            return response;
        }
    }
}
