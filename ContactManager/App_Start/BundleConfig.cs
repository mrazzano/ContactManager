using System.Web.Optimization;

namespace ContactManager
{
    public class BundleConfig
    {
        // For more information on Bundling, visit http://go.microsoft.com/fwlink/?LinkId=254725
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                "~/Scripts/jquery-{version}.js",
                "~/Scripts/bootstrap.js",
                "~/Scripts/bootbox.js"));

            bundles.Add(new ScriptBundle("~/bundles/knockout").Include(
               "~/Scripts/knockout-{version}.js",
               "~/Scripts/knockout.mapping-latest.js",
               "~/Scripts/knockout.validation.js"));

            bundles.Add(new ScriptBundle("~/bundles/contact").Include(
                "~/Scripts/app/contact.bindings.js",
                "~/Scripts/app/contact.datacontext.js",
                "~/Scripts/app/contact.viewmodel.js"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                "~/Scripts/modernizr-*"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                "~/Content/bootstrap.css",
                "~/Content/site.css"));

            // Set EnableOptimizations to false for debugging. For more information,
            // visit http://go.microsoft.com/fwlink/?LinkId=301862
            BundleTable.EnableOptimizations = true;

        }
    }
}