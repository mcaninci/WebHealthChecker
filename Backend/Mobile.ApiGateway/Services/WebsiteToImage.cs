using System.Drawing;
using System.IO;


using System;
using Mobile.ApiGateway.Services;
using WDSE.ScreenshotMaker;
using WDSE.Decorators;
using WDSE;
using WDSE.ScreenshotMaker;
using OpenQA.Selenium.Firefox;
using OpenQA.Selenium.Chrome;

public static class WebsiteToImage
{
    public static string takeScreenshotWithHtmlConverter(string url, string uniqeName, int width, int height, int timeout = 10)
    { 
       var driver = new ChromeDriver();
        driver.Manage().Timeouts().ImplicitWait = TimeSpan.FromSeconds(timeout);
          driver.Manage().Window.Size = new Size(width, width);
            driver.Navigate().GoToUrl(url);
            var bytes = driver.TakeScreenshot(new ScreenshotMaker());
            File.WriteAllBytes(uniqeName + ".jpg", bytes);
            driver.Quit();
          return imageToBase64(uniqeName + ".jpg");
    }
    public static string takeScreenshotWithGcHtml(string url, string uniqeName, int width, int height, int timeout = 10)
    {
        Console.WriteLine("takeScreenshotWithGcHtml");
        try
        {
          return takeScreenshotWithHtmlConverter(url,uniqeName,1200,800,timeout);

        }
        catch (Exception ex)
        {
           Console.WriteLine("websitetoimage error "+ex.Message);
         
            return "";

        }
    }

    public static string imageToBase64(string path)
    {

        byte[] byteImage = System.IO.File.ReadAllBytes(path);
        var compressedImage = CompressandBase64Helper.Compress(byteImage);
        System.IO.File.Delete(path);
        return Convert.ToBase64String(compressedImage);

    }

}
