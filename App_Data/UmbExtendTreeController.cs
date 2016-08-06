using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Formatting;
using System.Web;

using Umbraco.Core;
using Umbraco.Web.Models.Trees;
using Umbraco.Web.Mvc;
using Umbraco.Web.Trees;


/// <summary>
/// Summary description for UmbExtendTreeController
/// </summary>

[Tree("settings", "umbExtendTree", "Umbraco Extend")]
[PluginController("UmbExtend")]
public class UmbracoExtendTreeController : TreeController
{
    protected override TreeNodeCollection GetTreeNodes(string id, FormDataCollection queryStrings)
    {
        // check if we're rendering the root node's children
        if (id == Constants.System.Root.ToInvariantString())
        {
            // empty tree
            var tree = new TreeNodeCollection();
            // but if we wanted to add nodes - 
            /*  var tree = new TreeNodeCollection
            {
                CreateTreeNode("1", id, queryStrings, "My Node 1"), 
                CreateTreeNode("2", id, queryStrings, "My Node 2"), 
                CreateTreeNode("3", id, queryStrings, "My Node 3")
            };*/
            return tree;
        }
        // this tree doesn't support rendering more than 1 level
        throw new NotSupportedException();
    }


    protected override MenuItemCollection GetMenuForNode(string id, FormDataCollection queryStrings)
    {
        // create my menu item "Import"
        var menu = new MenuItemCollection();
        // duplicate this section for more than one icon
        var m = new MenuItem("import", "Import");
        m.Icon = "settings-alt";
        menu.Items.Add(m);

        return menu;
    }
}