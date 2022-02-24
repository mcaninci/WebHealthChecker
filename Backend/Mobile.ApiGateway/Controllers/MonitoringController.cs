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
using Mobile.ApiGateway.Services;

namespace Mobile.ApiGateway.Controllers
{
    [ApiController]
    //[Route("[controller]")]

    [Route("[controller]/[action]")]
    [EnableCors("_myAllowSpecificOrigins")]
    public class MonitoringController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        //TODO timezone test edilse iyi olur

        private readonly UserDefinition _userDefinitionRepository;
        private readonly Urls _urlsRepository;
        private readonly HealthCheckUrl _healthCheckUrlRepository;


        private int _authUserId;
        private UserType _authUserType;
        private string _authUserHashCode;


        public MonitoringController(IConfiguration configuration, IHttpContextAccessor accessor)
        {
            IEnumerable<Claim> userClaims = accessor?.HttpContext?.User?.Identities.FirstOrDefault()?.Claims;
            SetUserClaims(userClaims);

            _userDefinitionRepository = new UserDefinition();
            _urlsRepository = new Urls();
            _healthCheckUrlRepository = new HealthCheckUrl();


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





        [HttpPost]
        [BasicAuthorization]
        public ActionResult<GenericResponse<List<MonitoringModel>>> GetMonitoringList()
        {
            GenericResponse<List<MonitoringModel>> returnObject = new GenericResponse<List<MonitoringModel>>();
            try
            {
                //todo montioring ekranı ve bu servisten devam edersin
                var urls = _urlsRepository.GetList<Urls>(new { userDefinitionId = _authUserId });
                var urlids=urls.Select(x=>x.Id).ToArray();
                var monitoringList = _healthCheckUrlRepository.GetListConditions<HealthCheckUrl>("where urlId in @ids", new {ids = urlids});

                returnObject.Value = (from monitoringitem in monitoringList
                join url in urls on monitoringitem.urlId equals url.Id
                select( new MonitoringModel
                {
                    Id = monitoringitem.Id,
                    InsertDate = monitoringitem.InsertDate,
                    UrlId = monitoringitem.urlId,
                    Url = url.url,
                    Status = monitoringitem.status,
                    ScreenShot = "data:image/png;base64," + ImageFunction.decompresimage(monitoringitem.screenShot),
                    ResponseTime = monitoringitem.responseTime
                })).ToList();
                returnObject.IsSuccess = true;
          
            }
            catch (Exception ex)
            {
                returnObject.Results.Add(new Result("E00004", ex.Message.ToString()));
                returnObject.IsSuccess = false;



            }
            return returnObject;

        }



    }
}
