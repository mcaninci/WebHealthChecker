
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using DevTeam.Framework;
using Mobile.ApiGateway.Models.Customs;
using Mobile.ApiGateway.Models.Entities;

namespace Mobile.ApiGateway.Services
{
    public class HealthChecker
    {
        public HealthChecker()
        {


        }

        public bool CheckUrlsList(List<UrlModel> urls){
            foreach (var url in urls)
            {

               ThreadPool.QueueUserWorkItem(state => CheckUrlItem(url));

            }
           

            return true;;

        }

        public void CheckUrlItem(UrlModel url){
            
            RequestHelper requestHelper=new RequestHelper();
            HealthCheckUrl response= requestHelper.CallUrl(url);
            GenericResponse<int?> saveResponse =  ManuelDbOperation.InsertHealthCheckUrl(response);

        }


    }
}
