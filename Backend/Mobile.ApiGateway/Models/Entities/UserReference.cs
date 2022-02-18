using System;
using System.ComponentModel.DataAnnotations.Schema;
using DevTeam.Framework;

namespace Mobile.ApiGateway.Models.Entities
{
    [Serializable]

    [Table("USER_REFERENCE")]
    public class UserReference : EntityBase<UserReference>
    {

        [Column("USER_ID")]
        public int UserId { get; set; }

        [Column("REFERENCE_CODE")]
        public string ReferenceCode { get; set; }

    }
}
