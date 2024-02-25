const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");
const contactsPath = path.join(__dirname, "contacts.json");

// TODO: задокументувати кожну функцію
async function listContacts() {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}

async function getContactById(contactId) {
  const data = await listContacts();
  return data.find((item) => item.id === contactId) || null;
}

async function removeContact(contactId) {
  const data = await listContacts();
  const index = data.findIndex((item) => item.id === contactId);

  if (index === -1) return null;

  const [result] = data.splice(index, 1);

  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
  return result;
}

async function addContact(data) {
  const all = await listContacts();
  all.push({ id: nanoid(), ...data });
  return await fs.writeFile(contactsPath, JSON.stringify(all, null, 2));
}
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
