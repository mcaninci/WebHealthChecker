using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Mobile.ApiGateway.Models.Customs
{
    public class UrlModel
    {
        public int Id { get; set; }
        public string Urls { get; set; }
        public int UserId { get; set; }
        public DateTime InsertDate { get; set; }


        public int PrefixType { get; set; }

        public DateTime ScheculeTime { get; set; }
    }
}
