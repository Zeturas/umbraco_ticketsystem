using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Umbraco.Web.Editors;
using Umbraco.Web.Mvc;
using umbraco.BusinessLogic;
using Umbraco.Web.Security;
using System.Web.Security;
using Umbraco.Core.Persistence;


[PluginController("theTicketSystem")]
public class customUserServiceController : UmbracoAuthorizedJsonController
{
    public User getUserById(int id) {
        return umbraco.BusinessLogic.User.getAll().Where<User>(x => x.Id == id).FirstOrDefault();
    }

    public IEnumerable<User> getAll() {
        return umbraco.BusinessLogic.User.getAll();
    }
}