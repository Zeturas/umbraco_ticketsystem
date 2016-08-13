using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using Umbraco.Core.Persistence;
using Umbraco.Core.Persistence.DatabaseAnnotations;

[TableName("Ticket")]
[PrimaryKey("Id", autoIncrement = true)]
public class Ticket
{
    public Ticket() {}
    
    [PrimaryKeyColumn(AutoIncrement = true)]
    public int Id { get; set; }

    [Required]
    public string Subject { get; set; }

    [ForeignKey(typeof(Client))]
    public int fiClient { get; set; }
}