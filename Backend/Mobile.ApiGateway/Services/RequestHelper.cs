
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Net;
using System.Reflection;
using System.Threading;
using CoreHtmlToImage;
using DevTeam.Framework;
using Mobile.ApiGateway.Models.Customs;
using Mobile.ApiGateway.Models.Entities;


namespace Mobile.ApiGateway.Services
{
    public class RequestHelper
    {


        public HealthCheckUrl CallUrl(UrlModel url)
        {
            HttpWebRequest request;
            System.Diagnostics.Stopwatch timer;
            HealthCheckUrl urldetail = new HealthCheckUrl();
            try
            {

                Uri urlCheck = new Uri(url.Urls);
                request = (HttpWebRequest)WebRequest.Create(urlCheck);
                request.Timeout = 15000;
                HttpWebResponse response;
                timer = new Stopwatch();
                timer.Start();

                try
                {
                    var a = request.HaveResponse;

                    response = (HttpWebResponse)request.GetResponse();

                    timer.Stop();

                    TimeSpan timeTaken = timer.Elapsed;
                    urldetail.urlId = url.Id;
                    urldetail.InsertDate = DateHelper.GetLocalDate(DateTime.UtcNow);
                    urldetail.status = (int)response.StatusCode;
                    urldetail.responseTime = (int)timeTaken.TotalMilliseconds;
                    response.Close();
                   var imageBase64= WebsiteToImage.takeScreenshotWithGcHtml(url.Urls,url.UserId.ToString()+"urlid"+url.Id.ToString(), 100,100);
                    urldetail.screenShot = imageBase64;
                }
                catch (WebException ex)
                {
                    //hatalı caselerde response code önemli ekran görüntüsü olmayacak onun için dummy bir image ekleyebiliriz Uİ tarafında

                    timer.Stop();
                    TimeSpan timeTaken = timer.Elapsed;
                    urldetail.urlId = url.Id;
                    urldetail.InsertDate = DateHelper.GetLocalDate(DateTime.UtcNow);
                    urldetail.status = (int)ex.Status;
                    urldetail.responseTime = (int)timeTaken.TotalSeconds;
                    return urldetail;//could not connect to the internet (maybe) 
                }
            }
            catch (Exception ex)
            {
                urldetail.urlId = url.Id;
                urldetail.InsertDate = DateHelper.GetLocalDate(DateTime.UtcNow);
                urldetail.status = 0;
                urldetail.responseTime = 0;
                return urldetail;//could not connect to the internet (maybe) 
            }

            return urldetail;
        }
     

    }
}
