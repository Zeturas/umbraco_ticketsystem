using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Umbraco.Core;
using Umbraco.Core.Persistence;
using Umbraco.Web.Editors;
using Umbraco.Web.Mvc;

[PluginController("theTicketSystem")]
public class ClientApiController : UmbracoAuthorizedJsonController
{
    public IEnumerable<Client> GetAll()
    {
        var query = new Sql().Select("*").From("Client");
        return DatabaseContext.Database.Fetch<Client>(query);
    }

    public Client GetById(int id)
    {
        var query = new Sql().Select("*").From("Client").Where<Client>(x => x.Id == id);
        return DatabaseContext.Database.Fetch<Client>(query).FirstOrDefault();
    }

    public Client PostSave(Client client)
    {
        if (client.Id > 0)
        {
            DatabaseContext.Database.Update(client);
        } else
        {
            DatabaseContext.Database.Save(client);
        }

        return client;
    }

    public int DeleteById(int id)
    {
        return DatabaseContext.Database.Delete<Client>(id);
    }
}