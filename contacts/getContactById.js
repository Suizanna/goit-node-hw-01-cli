import contactsOperations from "./index.js";

async function getContactById(contactId) {
  try {
    const contacts = await contactsOperations.getAllContacts();
    const contact = contacts.find(
      (contact) => contact.id === Number(contactId)
    );
    if (!contact) {
      return null;
    }
    console.table(contact);
    return contact;
  } catch (error) {
    console.log(error.message);
  }
}

export default getContactById;
