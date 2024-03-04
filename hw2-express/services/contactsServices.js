// const fs = require("fs/promises");
// const path = require("path");
// const { nanoid } = require("nanoid");

import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.join("db", "contacts.json");
import contacts from "../db/contacts.json" assert { type: "json" };

// TODO: задокументувати кожну функцію
export async function listContacts() {
  // const data = await fs.readFile(contactsPath);
  // console.log(contacts);
  return contacts;
}

export async function getContactById(contactId) {
  return contacts.find((item) => item.id === contactId) || null;
}

export async function removeContact(contactId) {
  // const data = await listContacts();
  const index = contacts.findIndex((item) => item.id === contactId);

  if (index === -1) return null;

  const [result] = contacts.splice(index, 1);

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
}

export async function addContact(data) {
  const all = await listContacts();
  all.push({ id: nanoid(), ...data });
  return await fs.writeFile(contactsPath, JSON.stringify(all, null, 2));
}

// export async function updateContact(data) {

// }

// module.exports = {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
// };
