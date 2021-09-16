import fs from "fs/promises";
import contactsPath from "../utils/contactsPath.js";
import contactsOperations from "./index.js";
import { nanoid } from "nanoid";

async function addContact(name, email, phone) {
  try {
    const contacts = await contactsOperations.getAllContacts();
    const newContact = { name, email, phone, id: nanoid() };
    contacts.push(newContact);
    console.table(newContact);

    await fs.writeFile(contactsPath, JSON.stringify(contacts));

    console.table(await contactsOperations.getAllContacts());
    return newContact;
  } catch (error) {
    console.log(error.message);
  }
}

export default addContact;
