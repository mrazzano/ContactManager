using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Collections.Generic;
using ContactManager.Models;
using ContactManager.Repository;

namespace ContactManager.Controllers.Api
{
    public class ContactController : ApiController
    {
        private readonly IContactRepository _repository;

        public ContactController(IContactRepository repository)
        {
            _repository = repository;
        }

        // GET api/Contact 
        public IEnumerable<Contact> Get()
        {
            return _repository.Get();
        }

        // GET api/Contact/5 
        public Contact Get(int id)
        {
            return _repository.Get(id);
        }

        // POST api/Contact 
        public HttpResponseMessage Post(Contact value)
        {
            _repository.Add(value);
            return Request.CreateResponse(HttpStatusCode.Created, value);
        }

        // PUT api/Contact/5 
        public HttpResponseMessage Put(int id, Contact value)
        {
            _repository.Update(value);
            return Request.CreateResponse(HttpStatusCode.OK);
        }

        // DELETE api/Contact/5 
        public void Delete(int id)
        {
            _repository.Delete(id);
        }
    }
}