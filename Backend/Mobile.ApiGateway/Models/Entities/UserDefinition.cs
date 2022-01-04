using System;
using System.ComponentModel.DataAnnotations.Schema;
using DevTeam.Framework;
using Mobile.ApiGateway.Models.Customs;

namespace Mobile.ApiGateway.Models.Entities
{
    [Serializable]
    [Table("USER_DEFINITION")]
    public class UserDefinition : EntityBase<UserDefinition>
    {

        [Column("NAME")]
        public string Name { get; set; }

        [Column("SURNAME")]
        public string Surname { get; set; }

        [Column("Password")]
        public string Password { get; set; }

        [Column("MAIL")]
        public string Mail { get; set; }

        [Column("IS_VERIFY")]
        public bool IsVerify { get; set; }

        [Column("HASH_CODE")]
        public string HashCode { get; set; }

        [Column("TWITTER")]
        public string Twitter { get; set; }

        [Column("INSTAGRAM")]
        public string Instagram { get; set; }

        [Column("LINKEDIN")]
        public string LinkedIn { get; set; }

        [Column("IMAGE")]
        public string Image { get; set; }

        [Column("USER_TYPE")]
        public UserType UserType { get; set; }

        [Column("INSERT_DATE")]
        public DateTime InsertDate { get; set; }

        [Column("CODE")]
        public string Code { get; set; }

        [Column("TOKEN")]
        public string Token { get; set; }

        //total kazanç
        [Column("PROFIT")]
        public decimal Profit { get; set; }

        [NotMapped]
        public string ReferenceCode { get; set; }


    }
}
