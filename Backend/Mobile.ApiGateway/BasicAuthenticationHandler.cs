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
            //var authSplit = authBase64.Split(Convert.ToChar(":"), 2);
            //var authUsername = authSplit[0];
            //var authPassword = authSplit.Length > 1 ? authSplit[1] : throw new Exception("Unable to get password");

            UserDefinition userDefinition = new UserDefinition();
            UserDefinition user = userDefinition.GetList<UserDefinition>(new { Token = authBase64 }).FirstOrDefault();
            if (user != null)
            {
                var authenticatedUser = new AuthenticatedUser("BasicAuthentication", true, user.Name);
                var claims = new[] {
                    new Claim("UserId", user.Id.ToString()),
                    new Claim("UserType", ((int)user.UserType).ToString()),
                    new Claim("UserCode", user.Code),
                };
                ClaimsIdentity claimsIdentity = new ClaimsIdentity(authenticatedUser, claims);
               
                //var identity = new ClaimsIdentity(claims, "BasicAuthentication");
                //var principal = new ClaimsPrincipal(identity);
                //var ticket = new AuthenticationTicket(principal, "BasicAuthenticationScheme");

                var claimsPrincipal = new ClaimsPrincipal(claimsIdentity);

                return Task.FromResult(AuthenticateResult.Success(new AuthenticationTicket(claimsPrincipal, Scheme.Name)));
            }

            return Task.FromResult(AuthenticateResult.Fail("Login failed"));

            //if (authUsername != "roundthecode" || authPassword != "roundthecode")
            //{
            //    return Task.FromResult(AuthenticateResult.Fail("The username or password is not correct."));
            //}

            //var authenticatedUser = new AuthenticatedUser("BasicAuthentication", true, "roundthecode");
            //var claimsPrincipal = new ClaimsPrincipal(new ClaimsIdentity(authenticatedUser));

            //return Task.FromResult(AuthenticateResult.Success(new AuthenticationTicket(claimsPrincipal, Scheme.Name)));
        }
    }
}
