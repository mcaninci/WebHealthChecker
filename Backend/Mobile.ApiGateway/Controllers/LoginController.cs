using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using DevTeam.Framework;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Mobile.ApiGateway.Models.Customs;
using Mobile.ApiGateway.Models.Entities;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.Data.Sqlite;
using Dapper;

namespace Mobile.ApiGateway.Controllers
{
    [ApiController]
    //[Route("[controller]")]

    [Route("[controller]/[action]")]
    [EnableCors("_myAllowSpecificOrigins")]
    public class LoginController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        //private readonly IConfiguration _configuration;
        //private readonly string _connectionString; 
 
        private readonly UserDefinition _userDefinitionRepository;
        // private readonly UserReference _userReferenceRepository;
        private int _authUserId;
        private UserType _authUserType;
        private string _authUserHashCode;


        public LoginController(IConfiguration configuration, IHttpContextAccessor accessor)
        {
            IEnumerable<Claim> userClaims = accessor?.HttpContext?.User?.Identities.FirstOrDefault()?.Claims;
            SetUserClaims(userClaims);

            _userDefinitionRepository = new UserDefinition();


        }

        [Route("/error-local-development")]
        public IActionResult ErrorLocalDevelopment(
         [FromServices] IWebHostEnvironment webHostEnvironment)
        {
            if (webHostEnvironment.EnvironmentName != "Development")
            {
                throw new InvalidOperationException(
                    "This shouldn't be invoked in non-development environments.");
            }

            var context = HttpContext.Features.Get<IExceptionHandlerFeature>();

            return Problem(
                detail: context.Error.StackTrace,
                title: context.Error.Message);
        }

        private void SetUserClaims(IEnumerable<Claim> userClaims)
        {
            if (userClaims == null) return;

            foreach (Claim userClaim in userClaims)
            {
                switch (userClaim.Type)
                {
                    case "UserId":
                        if (!string.IsNullOrEmpty(userClaim.Value))
                            _authUserId = int.Parse(userClaim.Value);
                        break;
                    case "UserHashCode":
                        if (!string.IsNullOrEmpty(userClaim.Value))
                            _authUserHashCode = userClaim.Value;
                        break;
                }
            }
        }

        [HttpGet]
        public IActionResult HealthCheck()
        {
            UserDefinition user;
            try
            {
                GenericResponse<string> returnObject = new GenericResponse<string>();
                user = _userDefinitionRepository.GetList<UserDefinition>(new { Id = 1 }).FirstOrDefault();

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status200OK, ex.Message.ToString() + " " + ex.InnerException.Message + " " + ex.StackTrace);

            }

            return StatusCode(StatusCodes.Status200OK, "healthly " + user != null ? user.HashCode : 0);

        }


        [HttpPost]
        public ActionResult<GenericResponse<SignInResponseModel>> SignIn([FromBody] SignInRequestModel signInRequestModel)
        {
            GenericResponse<SignInResponseModel> returnObject = new GenericResponse<SignInResponseModel>();
          
            const string pleaseCheckUserOrPassword = "Please check your hashcode";

            if (signInRequestModel == null || string.IsNullOrEmpty(signInRequestModel.HashCode.Trim()))
            {
                returnObject.Results.Add(new Result("E00002", pleaseCheckUserOrPassword));
                return new ActionResult<GenericResponse<SignInResponseModel>>(returnObject);
            }
            string plainText = $"{signInRequestModel.HashCode}:EnBuyukGalatasaray";
            var userhashtemp = GetInt32HashCode(plainText).ToString();


            UserDefinition user = _userDefinitionRepository.GetList<UserDefinition>(new { HashCode = userhashtemp }).FirstOrDefault();
            if (user != null)
            {

                string tokenText = $"{signInRequestModel.HashCode}:EnBuyukGalatasaray:{DateTime.Now}";
                user.Token = Base64Helper.Base64Encode(tokenText);

                returnObject.Value = new SignInResponseModel() { Token = user.Token, HashCode = user.HashCode };
                _userDefinitionRepository.Update(user);
                returnObject.IsSuccess = true;

                return new ActionResult<GenericResponse<SignInResponseModel>>(returnObject);


            }

            returnObject.Results.Add(new Result("E00003", pleaseCheckUserOrPassword));
            return new ActionResult<GenericResponse<SignInResponseModel>>(returnObject);

        }


    

        [HttpPost]
        public IActionResult SignUp([FromBody] UserDefinition userDefinitionModel)
        {
            GenericResponse<UserDefinition> returnObject = new GenericResponse<UserDefinition>();

            string plainText = $"{userDefinitionModel.HashCode}:EnBuyukGalatasaray";
            var userhashtemp = GetInt32HashCode(plainText).ToString();

            UserDefinition user = _userDefinitionRepository.GetList<UserDefinition>(new { HashCode = userhashtemp }).FirstOrDefault();
            if (user != null)
            {
                returnObject.Results.Add(new Result("E00001", "Existing hashcode try again"));
                return BadRequest(returnObject);
            }

            //create token one time for user

            string tokenText = $"{userhashtemp}:EnBuyukGalatasaray:{DateTime.Now}";
            userDefinitionModel.Token = Base64Helper.Base64Encode(tokenText);
            //end create token one time for user

            userDefinitionModel.InsertDate = DateTime.UtcNow;
            userDefinitionModel.HashCode = userhashtemp;
           
            GenericResponse<int?> saveResponse = ManuelDbOperation.InsertUserDefinition(userDefinitionModel);
            if (!saveResponse.IsSuccess || saveResponse.Value == null)
            {
            
                return BadRequest(saveResponse);
            }


            returnObject.Value=userDefinitionModel;
            return Ok(returnObject);

        }


        private static int GetInt32HashCode(string strText)
        {
            var hashCode = 0;
            if (!string.IsNullOrEmpty(strText))
            {
                //Unicode Encode Covering all characterset
                var byteContents = Encoding.Unicode.GetBytes(strText);
                System.Security.Cryptography.SHA256 hash = new System.Security.Cryptography.SHA256CryptoServiceProvider();
                var hashText = hash.ComputeHash(byteContents);
                var hashCodeStart = BitConverter.ToInt32(hashText, 0);
                var hashCodeMedium = BitConverter.ToInt32(hashText, 8);
                var hashCodeEnd = BitConverter.ToInt32(hashText, 24);
                hashCode = hashCodeStart ^ hashCodeMedium ^ hashCodeEnd;
            }
            return (hashCode);
        }


    }
}
