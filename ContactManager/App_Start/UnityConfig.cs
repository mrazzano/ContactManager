using System.Web.Mvc;
using System.Web.Http;
using ContactManager.Repository;
using Microsoft.Practices.Unity;

namespace ContactManager
{
	public static class UnityConfig
	{
		public static void RegisterComponents()
		{
			var container = new UnityContainer();
			container.RegisterType<IContactRepository, ContactRepository>(); 
			
			DependencyResolver.SetResolver(new Unity.Mvc5.UnityDependencyResolver(container));
			GlobalConfiguration.Configuration.DependencyResolver = new Unity.WebApi.UnityDependencyResolver(container);
		}
	}
}