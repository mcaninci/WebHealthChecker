
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Net;
using System.Threading;
using DevTeam.Framework;
using Mobile.ApiGateway.Models.Customs;
using Mobile.ApiGateway.Models.Entities;

namespace Mobile.ApiGateway.Services
{
    public class RequestHelper
    {


        public HealthCheckUrl CallUrl(UrlModel url)
        {
            HealthCheckUrl urldetail = new HealthCheckUrl();
            Uri urlCheck = new Uri(url.Urls);
            HttpWebRequest request = (HttpWebRequest)WebRequest.Create(urlCheck);
            request.Timeout = 15000;
            HttpWebResponse response;

            System.Diagnostics.Stopwatch timer = new Stopwatch();
            timer.Start();
            try
            {
                response = (HttpWebResponse)request.GetResponse();
                response.Close();
                timer.Stop();
                TimeSpan timeTaken = timer.Elapsed;
                urldetail.urlId = url.Id;
                urldetail.InsertDate = DateHelper.GetLocalDate(DateTime.UtcNow);
                urldetail.status = (int)response.StatusCode;
                urldetail.responseTime = (int)timeTaken.TotalSeconds;
                //todoekran görüntüsü almak kaldı burası için
                // Bitmap bitmap;
                // using (Stream stream = request.GetResponse().GetResponseStream())
                // {
                //     bitmap = new Bitmap(stream);
                // }
            }
            catch (Exception ex)
            {
                //hatalı caselerde response code önemli ekran görüntüsü olmayacak onun için dummy bir image ekleyebiliriz Uİ tarafında

                timer.Stop();
                TimeSpan timeTaken = timer.Elapsed;
                urldetail.urlId = url.Id;
                urldetail.InsertDate = DateHelper.GetLocalDate(DateTime.UtcNow);
                // urldetail.status = (int)response.StatusCode;
                urldetail.responseTime = (int)timeTaken.TotalSeconds;
                return urldetail;//could not connect to the internet (maybe) 
            }
            return urldetail;
        }


    }
}
