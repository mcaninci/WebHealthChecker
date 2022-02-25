using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Mobile.ApiGateway.Services;

namespace HealthCheckWorker
{
    public class Worker : BackgroundService
    {
        private readonly ILogger<Worker> _logger;

        public Worker(ILogger<Worker> logger)
        {
            _logger = logger;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {

            //Burada db connnection önündeki 30 saniyeyi hesaplasın 
            //ardından gelen urller için ping atıp diğer iilemleri yapsın 

            while (!stoppingToken.IsCancellationRequested)
            {
                _logger.LogInformation("Worker running at: {time}", DateTimeOffset.Now);
                Task.Run(() =>
                {
                    ScheduleCalculate calculateurl = new ScheduleCalculate();
                    var urlList = calculateurl.GetUrlForChecker();
                    if (urlList.Count > 0)
                    {
                        HealthChecker checker = new HealthChecker();
                        checker.CheckUrlsList(urlList);
                    }
                });
                await Task.Delay(300000, stoppingToken);
            }
        }
    }
}
