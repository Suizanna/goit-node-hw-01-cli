import fs from "fs/promises";
import contactsPath from "../utils/contactsPath.js";

async function getAllContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    return console.error(error.message);
  }
}

export default getAllContacts;
