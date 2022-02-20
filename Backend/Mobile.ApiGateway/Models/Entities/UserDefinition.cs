using System;
using System.ComponentModel.DataAnnotations.Schema;
using DevTeam.Framework;
using Mobile.ApiGateway.Models.Customs;

namespace Mobile.ApiGateway.Models.Entities
{
    [Serializable]
    [Table("User_Definition")]
    public class UserDefinition : EntityBaseSQLlite<UserDefinition>
    {

      
        [Column("HashCode")]
        public string HashCode { get; set; }


        [Column("Token")]
        public string Token { get; set; }


    }
}
