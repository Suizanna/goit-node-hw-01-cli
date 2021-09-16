import contactsOperations from "./index.js";

async function listContacts() {
  try {
    const contacts = await contactsOperations.getAllContacts();
    console.table(contacts);
  } catch (error) {
    console.log(error.message);
  }
}

export default listContacts;
