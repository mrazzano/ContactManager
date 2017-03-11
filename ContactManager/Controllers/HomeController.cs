using System.Web.Mvc;
using System.Web.Script.Serialization;
using ContactManager.Repository;

namespace ContactManager.Controllers
{
    public class HomeController : Controller
    {
        private readonly IContactRepository _repository;

        public HomeController(IContactRepository repository)
        {
            _repository = repository;
        }

        public ActionResult Index()
        {
            var serializer = new JavaScriptSerializer();
            ViewBag.InitialData = serializer.Serialize(_repository.Get());
            
            return View();
        }
    }
}
