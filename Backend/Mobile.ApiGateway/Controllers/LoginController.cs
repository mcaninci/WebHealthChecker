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
                return BadRequest(userDefinitionModel);
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


        // private string GenerateUserCode()
        // {
        //     Random r = new Random();
        //     string userCode = "";
        //     for (int i = 0; i < 8; i++)
        //     {
        //         int a = r.Next(2);
        //         int character;
        //         switch (a)
        //         {
        //             case 0: // rakam 
        //                 character = r.Next(0, 9);
        //                 userCode = userCode + character.ToString();
        //                 break;
        //             case 1: // buyuk harf
        //                 character = r.Next(65, 90);
        //                 userCode = userCode + Convert.ToChar(character).ToString();
        //                 break;
        //             //case 2: // kucuk harf
        //             //    character = r.Next(97, 122);
        //             //    s = s + Convert.ToChar(character).ToString();
        //             //    break;
        //         }
        //     }

        //     UserDefinition checkUserCode = _userDefinitionRepository.GetList<UserDefinition>(new { Code = userCode }).FirstOrDefault();
        //     if (checkUserCode != null)
        //     {
        //         return GenerateUserCode();
        //     }

        //     return userCode;
        // }
        //
        //todo : sign in service
        //sign -up
        //get servisi hash code a göre 
        //user id ye göre get
        //billing hash code + user id ile olacak

        //     [HttpPost]
        //     //[HttpPost("~/connect/token"), Produces("application/json")]
        //     [BasicAuthorization]
        //     public ActionResult<GenericResponse<UserDefinition>> GetUserByUserId([FromBody] int userId)
        //     {
        //         //return LoginController.DummyGetUserByUserId(userId);

        //   GenericResponse<UserDefinition> returnObject = new GenericResponse<UserDefinition>();
        //         var userdata= _userReferenceRepository.Get<UserDefinition>(userId);
        //         returnObject.Value=userdata;
        //      return new ActionResult<GenericResponse<UserDefinition>>(returnObject);

        //     }



        //        private static ActionResult<UserDefinition> DummyGetUserByUserId(int userId)
        // {
        //     UserDefinition userDefinition = new UserDefinition();
        //     userDefinition.Id = userId;
        //     userDefinition.InsertDate = DateTime.Now;
        //     userDefinition.Name = "Sami";
        //     userDefinition.Surname = "Dulger";
        //     userDefinition.Instagram = "samidulger@instagram.com";
        //     userDefinition.LinkedIn = "samidulger@linkedin.com";
        //     userDefinition.Mail = "sami_dulger@hotmail.com";
        //     userDefinition.ReferenceCode = "Sd3738";
        //     userDefinition.IsVerify = true;
        //     userDefinition.HashCode = "123456";
        //     userDefinition.Password = "12345sd";
        //     userDefinition.Twitter = "https://twitter.com/samidulger";
        //     userDefinition.UserType = UserType.Diamond;
        //     userDefinition.Image =
        //         "iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAMAAABrrFhUAAAAA3NCSVQICAjb4U/gAAAACXBIWXMAAAhDAAAIQwGFAW1/AAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAm1QTFRF////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAATkofWQAAAM50Uk5TAAECAwQFBgcICQoLDA0ODxAREhMUFRcYGRobHB0eHyAhIiMlJygpKi4vMDEyMzQ1Njc5Ojs8Pj9AQkNISUpLTE1OT1BSVVZXWFlbXF1eX2BhYmNlZmdoamxtbm9wcXJzdXZ3eHl6e3x9fn+AgYOFhoeIiYqLjZCRlJWWl5iZmpufoaKkpaanqKmqq6ytrq+ztLa3uLm7vL2+v8HDxcfIycrLzc/Q0dLU1dbX2dvd3t/g4eLk5ebn6Onq6+zt7u/w8fLz9PX29/j5+vv8/f4eL1yDAAAG1ElEQVQYGeXBiXeU1RkH4N/MJJPZkiEgCSiNQrQiKhabBApBo41UbKlbkeISC0VtqrKY2NJYFSzFiti6DNEacxNcEMsiVk1MWAx2CCST+f1N7enxnH5URJbc93vv3OcBlChr2br/0Fz46vsdA/yPm+Cl7C8M/2u4Av6JLP7TCX7tKXjn8scP8X/mwC+pn75VZMAgvHLjcyM8XQ7+mLHmH/yGHfBEeevfCjyDHnhh7u+GeWb56Sh5U3/5Lr/d71HiGraf5Fl1laF0Vfz8XX6nt6aiRM188guei3+uqUEJunH7GM/V2M7mKEpK/Ge7eX6G/nz391AqZjwxyAux7w8/zsJ9C7aN8YIVep9cGIfLGrt5sf71ym1JOKqxm5Pi+AvNZXBPQzcnz3BHNdxSs42T62hbHO6IrjrGSXfwJxE44vJ+WtFXDydcN0BLDjfAAUu+ojWjy6De3eO0qPgrKPdbWvZMFJq10bonoFjjOK0rLoFaNZ9TwJE6KBX7O0X0x6HTJgp5BirNL1LKD6DRXyhmBxSaXaCYiTnQZzMFbYY60/IUlJ8Gbdopqh3a7KOovVAmU6SoQhK6/JDCFkCXVRS2Ero8R2F/hC79FNYHVWKjFDYagyZZistCkyzFZaFJFcVloUkVxWWhSRXFZaFJJcVVQZNKiquCJhmKq4ImGYqrgiYZiquCJmmKq4QmaYqrhCYpiquEJimKq4QmKYqrhCZJistAkyTFZaBJkuIy0CRBcRlokqC4DDSpoLg0NKmguDQ0qaC4NDSJU1wamsQpLg1NyikuBU3KKS4FTcopLgVNyiguBU3KKC4FTWIUl4QmMYpLQpMYxSWhSZTiktAkSnFJaBKhuAQ0iVBcAppEKC4BVSguAVUoLgFNplPcTGiyhOKaoUknxT0ORZYUKO7Uj6DFJZvHGYLxzZdAhdhuhmR3DBrcztDcDg3WMzTroUEnQ9MJDR5maB6GBrcwNLdAg1kMzSyocJghOQwddjEku6BDB0PSAR2WMyTLocNVDMlV0CGaZyjyUSjRy1D0QosuhqILWtzLUNwLLeYzFPOhRWKcIRhPQI09DMEe6LGVIdgKPR5kCB6EHosYgkXQYwpDMAWKHKS4g9BkJ8XthCaPUdxj0GQhxS2EJtFPKezTKFTppLBO6DKPwuZBmb0UtRfaPEJRj0CbqynqaqhziIIOQZ8uCuqCPi0U1AJ90icp5mQaCnVTTDc02kAxG6BRK8W0QqM6iqmDSsMUMgyd3qCQN6DTWgpZC52uoJAroFQfRfRBqzaKaINWs4oUUJwFtbopoBt6NVFAExTrpnXd0KyB1jVAtRwty0G3a07RqlPXQLk2WtUG7SI5WpSLQL3aIVozVAsH3ExrboYTXqYlL8MN9bSkHo4YoRUjcMUHtOIDuOIArTgAV+RpRR6OqKQllXBDPS2phxuaaEkT3LCMliyDG+6nJffDDRtoyQa4YQst2QI3vE5LXocb3qMl78ENg7RkEE6ITdCSiRhcUEtrauGCebRmHlzQTGua4YK7aM1dcMFGWrMRDogP0JqBOPTbSIuegna122nVjplQ7dd5WnZiHRRbTQGrodbsAgUUZkOrTorohFLJIxRxJAmd7qGQe6BTP4X0Q6U6iqmDRg9RzEPQqIdieqBQzQTFTNRAn5UUtBL65CgoB3WqxyhorBrarKCoFVBmytsU9fYUaJJcc5TCjq5JQouy+z5jCD67rwwaRJbvZ0j2L48gdEvfZ4jeX4pwNfYwZD2NCM/cV6nAq3MRjjnbilShuG0O5M3oGqMaY10zIKt6U56q5DdVQ05q3TGqc2xdCjLKVw1QpYFV5bAvescBqnXgjigsa9lD1fa0wKamd6jeO02w5drX6ITXroUN9S8W6Yjii/WYbJc+O06HjD97KSbT1I4TdMyJjqmYLOlHv6SDvnw0jckQXz1IRw2ujuNiRVd8TId9vCKKi3Lrh3Tch7fiwi3qZQnoXYQLc32OJSJ3Pc7flS8VWTKKL12J83PZ8wWWlMLzl+HcTXt6lCVn9OlpODeZ9hGWpJH2DL5bxQNDLFlDD1Tg7GJ3fsKS9smdMZxF60cseR+14tss7qMX+hbjTG7YRW/sugHfsJ5eWY/TRbroma4IghbQOwsQ1E7vtCPoTXrnTQQZescgyNA7BkGG3jEIMvSOQZChdwyCDL1jEGToHYMgQ+8YBBl6xyDI0DsGQYbeMQgy9I5BkKF3DIIMvWMQZOgdgyBD7xgEGXrHIMjQOwZBht4xCDL0jkGQoXcMggy9YxBk6B2DoJ30zl8RtJbe+Q2Cpg/RM4drcZqlx+mV4zfh/9Rt2VekJ4r7ttTha/8GDrmYl1PRgW4AAAAASUVORK5CYII=";
        //     userDefinition.Profit = (decimal)500.15;
        //     return new ActionResult<UserDefinition>(userDefinition);
        // }






    }
}
