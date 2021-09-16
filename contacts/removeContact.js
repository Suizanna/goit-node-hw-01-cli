import fs from "fs/promises";
import contactsPath from "../utils/contactsPath.js";
import contactsOperations from "./index.js";

async function removeContact(contactId) {
  try {
    const contacts = await contactsOperations.getAllContacts();
    const contact = await contactsOperations.getContactById(contactId);

    if (!contact) return;
    console.log("Removing a contact...");

    const newContacts = contacts.filter(
      (contact) => contact.id !== Number(contactId)
    );

    await fs.writeFile(contactsPath, JSON.stringify(newContacts));
    console.table(await contactsOperations.getAllContacts());
    console.log("Success remove");
  } catch (error) {
    console.log(error.message);
  }
}
export default removeContact;
