using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Mobile.ApiGateway.Models.Customs
{
    public class MonitoringModel
    {
        public int Id { get; set; }
         public DateTime InsertDate { get; set; }
        public int UrlId { get; set; }
        public string Url { get; set; }
        public int Status { get; set; }
        public string ScreenShot { get; set; }
        public int ResponseTime { get; set; }
    }
}
