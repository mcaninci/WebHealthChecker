using System.Security.Principal;

namespace Mobile.ApiGateway
{
    // AuthenticatedUser.cs
    public class AuthenticatedUser : IIdentity
    {
        public AuthenticatedUser(string authenticationType, bool isAuthenticated, string userHashCode)
        {
            AuthenticationType = authenticationType;
            IsAuthenticated = isAuthenticated;
            Name = userHashCode;
        }

        public string AuthenticationType { get; }

        public bool IsAuthenticated { get; }

        public string Name { get; }


    }

}
