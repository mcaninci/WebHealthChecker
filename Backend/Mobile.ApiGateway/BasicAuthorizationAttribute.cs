using Microsoft.AspNetCore.Authorization;

namespace Mobile.ApiGateway
{
    public class BasicAuthorizationAttribute : AuthorizeAttribute
    {
        public BasicAuthorizationAttribute()
        {
            Policy = "BasicAuthentication";
        }
    }
}
