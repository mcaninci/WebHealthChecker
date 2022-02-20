using System;
using System.ComponentModel.DataAnnotations.Schema;
using DevTeam.Framework;

namespace Mobile.ApiGateway.Models.Entities
{
    [Serializable]

    [Table("urls")]
    public class Urls : EntityBaseSQLlite<Urls>
    {

        [Column("url")]
        public string url { get; set; }

        [Column("user_definition_id")]
        public int userDefinitionId { get; set; }

        [Column("scheduletime")]
        public DateTime scheduletime { get; set; }

    }
}
