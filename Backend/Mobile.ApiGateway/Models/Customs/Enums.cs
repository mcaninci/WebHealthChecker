using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Mobile.ApiGateway.Models.Customs
{
    public enum UserType
    {
        Diamond = 1,
        Gold = 2,
        Silver = 3,
        Bronze = 4

    }
    public enum UrlPrefixType
    {
        None = 0,
        HTTP = 1,
        HTTPS = 2

    }
}
