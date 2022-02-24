using Mobile.ApiGateway.Services;
using System;
using System.Collections.Generic;
using System.IO;
using System.IO.Compression;
using System.Linq;
using System.Threading.Tasks;

namespace Mobile.ApiGateway.Services
{
    public static class CompressandBase64Helper
    {
        public static byte[] Compress(byte[] data)
        {
            MemoryStream output = new MemoryStream();
            using (DeflateStream dstream = new DeflateStream(output, CompressionLevel.Optimal))
            {
                dstream.Write(data, 0, data.Length);
            }
            return output.ToArray();
        }

        public static byte[] Decompress(byte[] data)
        {
            MemoryStream input = new MemoryStream(data);
            MemoryStream output = new MemoryStream();
            using (DeflateStream dstream = new DeflateStream(input, CompressionMode.Decompress))
            {
                dstream.CopyTo(output);
            }
            return output.ToArray();
        }

        public static byte[] Base64toByte(string base64)
        {
            return System.Convert.FromBase64String(base64);
        }

        public static string BytetoBase64(byte[] byteArray)
        {
            return Convert.ToBase64String(byteArray);

        }
        public static Func<T1, T4> DecompressforBase64<T1, T2, T3, T4>(Func<T1, T2> f1, Func<T2, T3> f2, Func<T3, T4> f3) => x => f3(f2(f1(x)));

    }






    public class ImageFunction
    {
        public static Func<string, string> decompresimage = CompressandBase64Helper.DecompressforBase64<string, byte[], byte[], string>(
                            CompressandBase64Helper.Base64toByte,
                            CompressandBase64Helper.Decompress,
                            CompressandBase64Helper.BytetoBase64);

    }

}