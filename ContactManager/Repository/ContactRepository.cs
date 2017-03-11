using System.Linq;
using System.Collections.Generic;
using ContactManager.Database;
using ContactManager.Models;

namespace ContactManager.Repository
{
    public class ContactRepository : IContactRepository
    {
        private readonly ContactContext _context;

        public ContactRepository(ContactContext context)
        {
            _context = context;
        }

        public IEnumerable<Contact> Get()
        {
            return _context.Contacts.ToList();
        }

        public Contact Get(int id)
        {
            return _context.Contacts.SingleOrDefault(x => x.Id == id);
        }

        public void Add(Contact entity)
        {
            _context.Contacts.Add(entity);
            _context.SaveChanges();
        }

        public void Update(Contact entity)
        {
            var contact = _context.Contacts.Find(entity.Id);
            _context.Entry(contact).CurrentValues.SetValues(entity);
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            var contact = _context.Contacts.Find(id);
            _context.Contacts.Remove(contact);
            _context.SaveChanges();
        }
    }
}