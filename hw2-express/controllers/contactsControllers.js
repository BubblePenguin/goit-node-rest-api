import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";

// export const getAllContacts = (req, res) => {
//   res.json();
// };

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
  const { name, phone, email } = req.params;
  if (!name || !phone || !email) throw HttpError(403, "Not enough data");
  res.json(addContact({ name, phone, email }));
}

async function updateContact(req, res) {
  throw HttpError(500, "Not done yet");
}

export {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
};

// export const getAllContacts = CtrlWrap(getAllContacts);
// export const getOneContact = CtrlWrap(getOneContact);
// export const deleteContact = CtrlWrap(deleteContact);
// export const createContact = CtrlWrap(createContact);
// export const updateContact = CtrlWrap(updateContact);
