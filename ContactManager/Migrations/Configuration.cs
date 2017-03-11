using ContactManager.Models;
using System.Data.Entity.Migrations;

namespace ContactManager.Migrations
{
    internal sealed class Configuration : DbMigrationsConfiguration<ContactManager.Database.ContactContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = true;
            ContextKey = "ContactManager.Database.ContactContext";
        }

        protected override void Seed(ContactManager.Database.ContactContext context)
        {
            context.Contacts.AddOrUpdate(
                new Contact { FirstName = "Andrew", LastName = "Peters", EmailAddress = "apeters@gmail.com" },
                new Contact { FirstName = "Brice", LastName = "Lambson", EmailAddress = "blambson@gmail.com" },
                new Contact { FirstName = "Rowan", LastName = "Miller", EmailAddress = "rmiller@gmail.com" },
                new Contact { FirstName = "Mike", LastName = "Wallace", EmailAddress = "mwallace@gmail.com" },
                new Contact { FirstName = "John", LastName = "Smith", EmailAddress = "jsmith@gmail.com" },
                new Contact { FirstName = "Doug", LastName = "Linnie", EmailAddress = "dlinnie@gmail.com" },
                new Contact { FirstName = "Mary", LastName = "Rank", EmailAddress = "mrank@gmail.com" }
                );
        }
    }
}
