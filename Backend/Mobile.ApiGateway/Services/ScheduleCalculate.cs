
using System;
using System.Collections.Generic;
using System.Linq;
using DevTeam.Framework;
using Mobile.ApiGateway.Models.Customs;
using Mobile.ApiGateway.Models.Entities;

namespace Mobile.ApiGateway.Services
{
    public class ScheduleCalculate
    {
        private readonly Urls _urlsRepository;
        public ScheduleCalculate()
        {

            _urlsRepository = new Urls();

        }

        public List<UrlModel> GetUrlForChecker(){
            string now=(DateHelper.GetLocalDate(DateTime.UtcNow).AddMinutes(-1)).ToString("HH:mm");
            string nextTime=(DateHelper.GetLocalDate(DateTime.UtcNow).AddMinutes(5)).ToString("HH:mm");
           
                var urls = _urlsRepository.GetListConditions<Urls>("where  strftime('%H:%M',scheduletime) >= @now and strftime('%H:%M',scheduletime) <= @nextTime", new {now = now,nextTime=nextTime});
                 List<UrlModel>  urlsforchecker= urls.Select(x =>
                new UrlModel() { Id = x.Id, Urls = x.url, UserId = x.userDefinitionId, InsertDate = x.InsertDate, ScheculeTime = x.scheduletime }).ToList();
       
            return urlsforchecker;

        }

    }
}
