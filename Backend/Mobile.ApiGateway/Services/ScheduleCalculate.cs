
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

            string nextTime=(DateHelper.GetLocalDate(DateTime.UtcNow).AddMinutes(5)).ToString("HH:mm");
           
         //TODO burası küçük değil aralık olmalı test için data gelsin diye böyle bıraktım 
                var urls = _urlsRepository.GetListConditions<Urls>("where  strftime('%H:%M',scheduletime) > @time", new {time = nextTime});
                 List<UrlModel>  urlsforchecker= urls.Select(x =>
                new UrlModel() { Id = x.Id, Urls = x.url, UserId = x.userDefinitionId, InsertDate = x.InsertDate, ScheculeTime = x.scheduletime }).ToList();
       
            return urlsforchecker;

        }

    }
}
