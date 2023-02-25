using Google.Apis.AnalyticsReporting.v4.Data;
using Sabio.Models.Requests;

namespace Sabio.Services.Interfaces
{
    public interface IGoogleAnalyticsService
    {
        GetReportsResponse GetAnalyticsReport(GoogleAnalyticsRequest model);
    }
}
