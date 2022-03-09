using System.Linq;
using System.Security.Claims;
using System.Text.Encodings.Web;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Mobile.ApiGateway.Models.Entities;
using System.Text;
using System;

namespace Mobile.ApiGateway
{
    public class BasicAuthenticationHandler : AuthenticationHandler<AuthenticationSchemeOptions>
    {
        public BasicAuthenticationHandler(
            IOptionsMonitor<AuthenticationSchemeOptions> options,
            ILoggerFactory logger,
            UrlEncoder encoder,
            ISystemClock clock
        )
            : base(options, logger, encoder, clock)
        {
        }

        protected override Task<AuthenticateResult> HandleAuthenticateAsync()
        {
            Response.Headers.Add("WWW-Authenticate", "Basic");

            if (!Request.Headers.ContainsKey("Authorization"))
            {
                return Task.FromResult(AuthenticateResult.Fail("Authorization header missing."));
            }

            // Get authorization key
            var authorizationHeader = Request.Headers["Authorization"].ToString();
            var authHeaderRegex = new Regex(@"Basic (.*)");

            if (!authHeaderRegex.IsMatch(authorizationHeader))
            {
                return Task.FromResult(AuthenticateResult.Fail("Authorization code not formatted properly."));
            }

            var token = authHeaderRegex.Replace(authorizationHeader, "$1");
            
            var authBase64 = Encoding.UTF8.GetString(Convert.FromBase64String(token));
    
            UserDefinition userDefinition = new UserDefinition();
            UserDefinition user = userDefinition.GetList<UserDefinition>(new { Token = authBase64 }).FirstOrDefault();
            if (user != null)
            {
                var authenticatedUser = new AuthenticatedUser("BasicAuthentication", true, user.HashCode);
                var claims = new[] {
                    new Claim("UserId", user.Id.ToString()),
                    new Claim("UserHashCode", user.HashCode),
                };
                ClaimsIdentity claimsIdentity = new ClaimsIdentity(authenticatedUser, claims);
               

                var claimsPrincipal = new ClaimsPrincipal(claimsIdentity);

                return Task.FromResult(AuthenticateResult.Success(new AuthenticationTicket(claimsPrincipal, Scheme.Name)));
            }

            return Task.FromResult(AuthenticateResult.Fail("Login failed"));

        
        }
    }
}
