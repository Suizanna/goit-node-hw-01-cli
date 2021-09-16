const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "/db/contacts.json");

async function getAllContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    return console.error(error.message);
  }
}

async function listContacts() {
  try {
    const contacts = await getAllContacts();
    console.table(contacts);
  } catch (error) {
    console.log(error.message);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await getAllContacts();
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

async function removeContact(contactId) {
  try {
    const contacts = await getAllContacts();
    const contact = await getContactById(contactId);

    if (!contact) return;
    console.log("Removing a contact...");

    const newContacts = contacts.filter(
      (contact) => contact.id !== Number(contactId)
    );

    await fs.writeFile(contactsPath, JSON.stringify(newContacts));
    console.table(await getAllContacts());
    console.log("Success remove");
  } catch (error) {
    console.log(error.message);
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await getAllContacts();
    const newContact = { name, email, phone, id: nanoid() };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    console.table(newContact);
    return newContact;
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};
