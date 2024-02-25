import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} from "../services/contactsServices.js";
import { HttpError } from "../helpers/HttpError.js";

export const getAllContacts = (req, res) => {
  res.json(listContacts());
};

export const getOneContact = (req, res) => {
  try {
    const { id } = req.params;
    const result = getContactById(id);
    if (!result) throw HttpError(404, "Not found");
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const deleteContact = (req, res) => {
  try {
    const { id } = req.params;
    const result = getContactById(id);
    if (!result) throw HttpError(404, "Not found");
    res.json(removeContact(id));
  } catch (error) {
    next(error);
  }
};

export const createContact = (req, res) => {
  try {
    const { name, phone, email } = req.params;
    if (!name || !phone || !email) throw HttpError(403, "Not enough data");
    res.json(addContact({ name, phone, email }));
  } catch (error) {
    next(error);
  }
};

export const updateContact = (req, res) => {};
