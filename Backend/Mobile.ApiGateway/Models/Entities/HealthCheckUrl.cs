using System;
using System.ComponentModel.DataAnnotations.Schema;
using DevTeam.Framework;

namespace Mobile.ApiGateway.Models.Entities
{
    [Serializable]

    [Table("HealthCheckURL")]
    public class HealthCheckUrl : EntityBaseSQLlite<HealthCheckUrl>
    {

        [Column("url_id")]
        public int urlId { get; set; }

        [Column("status")]
        public int status { get; set; }

        [Column("ScreenShot")]
        public string screenShot { get; set; }
   
    [Column("response_time")]
        public int responseTime { get; set; }
    }
}
