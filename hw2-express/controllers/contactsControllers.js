import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updContact,
} from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";

import {
  createContactSchema,
  updateContactSchema,
} from "../schemas/contactsSchemas.js";

import validateBody from "../helpers/validateBody.js";

async function getAllContacts(req, res) {
  res.json(await listContacts());
}

async function getOneContact(req, res) {
  const { id } = req.params;
  const result = await getContactById(id);
  if (!result) throw HttpError(404, `${id} Not found`);
  res.json(result);
}

async function deleteContact(req, res, next) {
  const { id } = req.params;
  const result = await removeContact(id);
  if (!result) throw HttpError(404, `${id} Not found`);
  res.json({
    message: `deleted succesfully`,
    id: `${id}`,
  });
}

async function createContact(req, res) {
  validateBody(createContactSchema.validate(req.body));
  const { name, phone, email } = req.body;
  res.status(201).json(await addContact({ name, phone, email }));
}

async function updateContact(req, res) {
  const { id } = req.params;
  const result = await getContactById(id);
  if (!result) throw HttpError(404, `${id} Not found`);

  validateBody(updateContactSchema.validate(req.body));

  const { name, phone, email } = req.body;
  res.status(201).json(await updContact(id, { name, phone, email }));
}

export {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
};
