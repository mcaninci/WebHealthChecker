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
    public class UrlController : Controller
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


        public UrlController(IConfiguration configuration, IHttpContextAccessor accessor)
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
        public ActionResult<GenericResponse<UrlSaveModel>> Save([FromBody] UrlModel urlsModel)
        {
            GenericResponse<UrlSaveModel> returnObject = new GenericResponse<UrlSaveModel>();

            const string pleaseCheckUserOrPassword = "You have to add urls";

            if (urlsModel == null || string.IsNullOrEmpty(urlsModel.Urls.Trim()))
            {
                returnObject.Results.Add(new Result("E00004", pleaseCheckUserOrPassword));
                return new ActionResult<GenericResponse<UrlSaveModel>>(returnObject);
            }
            int totalUrlsCount = 0;
            int ErrorUrlCount = 0;
            try
            {
                var urls = new string[10];
                var cleanedUrls = urlsModel.Urls.Replace("\n", "").Replace(" ", "");
                if (urlsModel.Urls.IndexOf(';') > 0)
                {
                    urls = cleanedUrls.Split(';');
                }
                else
                {
                    urls = new[] { cleanedUrls };
                }

                totalUrlsCount = urls.Length;
                urls.ToList().ForEach(url =>
                  {
                      Urls entity = new Urls();
                      if (!string.IsNullOrEmpty(url))
                      {
                          if (urlsModel.PrefixType == (int)UrlPrefixType.None)
                          {
                              entity.url = url;
                          }
                          else if (urlsModel.PrefixType == (int)UrlPrefixType.HTTP)
                          {
                              entity.url = "http://" + url;
                          }
                          else if (urlsModel.PrefixType == (int)UrlPrefixType.HTTPS)
                          {
                              entity.url = "https://" + url;
                          }
                          if (Uri.IsWellFormedUriString(entity.url, UriKind.Absolute))
                          {

                              entity.userDefinitionId = _authUserId;
                              entity.InsertDate = DateTime.UtcNow;
                              entity.scheduletime = DateHelper.GetLocalDate(urlsModel.ScheculeTime);
                              ManuelDbOperation.InsertUrl(entity);
                          }
                          else
                          {
                              ErrorUrlCount++;
                          }
                      }

                  });

                returnObject.IsSuccess = true;
                returnObject.Value = new UrlSaveModel() { SuccessfulUrlCount = totalUrlsCount - ErrorUrlCount, ErrorUrlCound = ErrorUrlCount };


                return new ActionResult<GenericResponse<UrlSaveModel>>(returnObject);
            }
            catch (Exception excp)
            {
                returnObject.Results.Add(new Result("E00003", pleaseCheckUserOrPassword));
                return new ActionResult<GenericResponse<UrlSaveModel>>(returnObject);

            }


        }


        [HttpPost]
        [BasicAuthorization]
        public ActionResult<GenericResponse<List<UrlModel>>> GetUrls()
        {
            GenericResponse<List<UrlModel>> returnObject = new GenericResponse<List<UrlModel>>();
            try
            {
                var urls = _urlsRepository.GetList<Urls>(new { userDefinitionId = _authUserId });
                returnObject.IsSuccess = true;
                returnObject.Value = urls.Select(x =>
                new UrlModel() { Id = x.Id, Urls = x.url, UserId = x.userDefinitionId, InsertDate = x.InsertDate, ScheculeTime = x.scheduletime }).ToList();
                return new ActionResult<GenericResponse<List<UrlModel>>>(returnObject);
            }
            catch (Exception excp)
            {
                returnObject.Results.Add(new Result("E00004", excp.Message));
                return new ActionResult<GenericResponse<List<UrlModel>>>(returnObject);

            }




        }


        [HttpPost]
        [BasicAuthorization]
        public ActionResult<GenericResponse<UrlSaveModel>> Update([FromBody] UrlModel urlsModel)
        {
            GenericResponse<UrlSaveModel> returnObject = new GenericResponse<UrlSaveModel>();

            const string pleaseCheckUserOrPassword = "You have to add urls";

            if (urlsModel == null || string.IsNullOrEmpty(urlsModel.Urls.Trim()))
            {
                returnObject.Results.Add(new Result("E00004", pleaseCheckUserOrPassword));
                return new ActionResult<GenericResponse<UrlSaveModel>>(returnObject);
            }

            var urlData = _urlsRepository.GetList<Urls>(new { Id = urlsModel.Id, userDefinitionId = _authUserId }).FirstOrDefault();
            if (urlData == null)
            {
                returnObject.Results.Add(new Result("E00005", "Record not found"));
                returnObject.Value = new UrlSaveModel() { SuccessfulUrlCount = 0, ErrorUrlCound = 1 };
                return new ActionResult<GenericResponse<UrlSaveModel>>(returnObject);
            }
            try
            {

                urlData.url = urlsModel.Urls;
                urlData.scheduletime = DateHelper.GetLocalDate(urlsModel.ScheculeTime);
                _urlsRepository.Update(urlData);
                returnObject.IsSuccess = true;
                returnObject.Value = new UrlSaveModel() { SuccessfulUrlCount = 1, ErrorUrlCound = 0 };
                return new ActionResult<GenericResponse<UrlSaveModel>>(returnObject);
            }
            catch (Exception excp)
            {
                returnObject.Results.Add(new Result("E00006", excp.Message));
                return new ActionResult<GenericResponse<UrlSaveModel>>(returnObject);

            }

        }

        [HttpPost]
        [BasicAuthorization]
        public ActionResult<GenericResponse<bool>> DeleteUrlById([FromBody] int urlId)
        {
            GenericResponse<bool> returnObject = new GenericResponse<bool>();

            try
            {
             
                _healthCheckUrlRepository.DeleteByConditions<HealthCheckUrl>("where url_Id = @ids", new {ids = urlId});
                _urlsRepository.DeleteByConditions<Urls>("where Id = @ids", new {ids = urlId});
                returnObject.IsSuccess = true;
                return new ActionResult<GenericResponse<bool>>(returnObject);
            }
            catch (Exception excp)
            {
                returnObject.Results.Add(new Result("E00007", excp.Message));
                return new ActionResult<GenericResponse<bool>>(returnObject);

            }

        }
    }
}
