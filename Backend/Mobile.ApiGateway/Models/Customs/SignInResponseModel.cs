using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Mobile.ApiGateway.Models.Customs
{
    public class SignInResponseModel
    {
        public string Token { get; set; }

        public string HashCode { get; set; }
    }
}
