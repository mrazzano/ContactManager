using System.Collections.Generic;
using ContactManager.Models;

namespace ContactManager.Repository
{
    public interface IContactRepository
    {
        IEnumerable<Contact> Get();
        Contact Get(int id);
        void Add(Contact entity);
        void Update(Contact entity);
        void Delete(int id);
    }
}