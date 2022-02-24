
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


                    // StreamReader reader = new StreamReader(response.GetResponseStream());
                    // string urlText = reader.ReadToEnd(); // it takes the response from your url. now you can use as your need  

                    TimeSpan timeTaken = timer.Elapsed;
                    urldetail.urlId = url.Id;
                    urldetail.InsertDate = DateHelper.GetLocalDate(DateTime.UtcNow);
                    urldetail.status = (int)response.StatusCode;
                    urldetail.responseTime = (int)timeTaken.TotalSeconds;
                    response.Close();
                    //todoekran görüntüsü almak kaldı burası için
                    // Bitmap bitmap;
                    // using (Stream stream = request.GetResponse().GetResponseStream())
                    // {
                    //     bitmap = new Bitmap(stream);
                    // }
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
        protected bool takeScreenshot(string url, int width, int height, int timeout = 10)
        {
            ChromeOptions options = new ChromeOptions();
            options.AddArgument("headless");//Comment if we want to see the window. 
            var driver = new ChromeDriver(Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location), options);
            driver.Navigate().GoToUrl("https://www.google.com");
            var screenshot = (driver as ITakesScreenshot).GetScreenshot();
            screenshot.SaveAsFile("screenshot.png");
            driver.Close();
            driver.Quit();

            return true;
        }


    }
}
