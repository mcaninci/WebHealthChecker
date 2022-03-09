using System.Drawing;
using System.IO;
using CoreHtmlToImage;
using GrapeCity.Documents.Html;
using GrapeCity.Documents.Imaging;
using GrapeCity.Documents.Drawing;
using System;
using Mobile.ApiGateway.Services;

public static class WebsiteToImage
{
    public static bool takeScreenshotWithHtmlConverter(string url, string uniqeName, int width, int height, int timeout = 10)
    {
        var converter = new HtmlConverter();
        var bytes = converter.FromUrl(url);
        File.WriteAllBytes(uniqeName + ".jpg", bytes);

        return true;
    }
    public static string takeScreenshotWithGcHtml(string url, string uniqeName, int width, int height, int timeout = 10)
    {
        try
        {

            var uri = new Uri(@url);

            //Create a GcHtmlRenderer instance in a using block
            using (var re = new GcHtmlRenderer(uri))
            {
                //Create a JpegSetting instance to specify the output image settings for the JPEG format
                JpegSettings jpegSettings = new JpegSettings();
                jpegSettings.DefaultBackgroundColor = System.Drawing.Color.White;
                jpegSettings.WindowSize = new Size(1000, 800);

                //Finally, render the string to an image using RenderToJpeg method of GcHtmlRenderer
                re.RenderToJpeg(uniqeName + ".jpeg", jpegSettings);
                return imageToBase64(uniqeName + ".jpeg");
            }
        }
        catch (Exception ex)
        {
            try
            {
                takeScreenshotWithHtmlConverter(url,uniqeName,width,height,timeout);
                 return imageToBase64(uniqeName + ".jpeg");
            }
            catch (Exception excep)
            {

                return "";
            }

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
