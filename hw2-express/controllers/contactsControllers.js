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

export async function getAllContacts(req, res) {
  res.json(await listContacts());
}

export async function getOneContact(req, res, next) {
  try {
    const { id } = req.params;
    const result = await getContactById(id);
    if (!result) throw HttpError(404, `${id} Not found`);
    res.json(result);
  } catch (error) {
    next(error);
  }
}

export async function deleteContact(req, res, next) {
  try {
    const { id } = req.params;
    const result = await getContactById(id);
    if (!result) throw HttpError(404, `${id} Not found`);
    res.json(await removeContact(id));
  } catch (error) {
    next(error);
  }
}

export const createContact = (req, res) => {
  try {
    const { name, phone, email } = req.params;
    if (!name || !phone || !email) throw HttpError(403, "Not enough data");
    res.json(addContact({ name, phone, email }));
  } catch (error) {
    next(error);
  }
};

export const updateContact = (req, res) => {
  try {
    throw HttpError(500, "Not done yet");
  } catch (error) {
    next(error);
  }
};
