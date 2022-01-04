using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Mobile.ApiGateway.Models.Customs
{
    public class BillingResponseModel
    {
        public List<BillingUserModel> BillingUserModelList { get; set; }

        public double TotalPrice { get; set; }


    }

    public class BillingUserModel
    {
        public string Name { get; set; }

        public string Surname { get; set; }

        public UserType UserType { get; set; }

        public DateTime InsertDate { get; set; }

        public DateTime PaidDate { get; set; }

        public double Price { get; set; }
       
    }
}
