using System;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using ContactManager.Models;

namespace ContactManager.Database
{
    public class ContactContext : DbContext
    {
        public DbSet<Contact> Contacts { get; set; }
        
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            if (modelBuilder == null)
                throw new ArgumentNullException("modelBuilder");

            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
        }
    }
}