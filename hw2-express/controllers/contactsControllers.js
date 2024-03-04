import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";
import CtrlWrap from "../helpers/CtrlWrap.js";

// export const getAllContacts = (req, res) => {
//   res.json();
// };

async function getAllContacts(req, res) {
  res.json(await listContacts());
}

async function getOneContact(req, res, next) {
  try {
    const { id } = req.params;
    const result = await getContactById(id);
    if (!result) throw HttpError(404, `${id} Not found`);
    res.json(result);
  } catch (error) {
    next(error);
  }
}

async function deleteContact(req, res, next) {
  try {
    const { id } = req.params;
    const result = await removeContact(id);
    if (!result) throw HttpError(404, `${id} Not found`);
    res.json({
      message: `deleted succesfully`,
      id: `${id}`,
    });
  } catch (error) {
    next(error);
  }
}

async function createContact(req, res) {
  try {
    const { name, phone, email } = req.params;
    if (!name || !phone || !email) throw HttpError(403, "Not enough data");
    res.json(addContact({ name, phone, email }));
  } catch (error) {
    next(error);
  }
}

async function updateContact(req, res) {
  try {
    throw HttpError(500, "Not done yet");
  } catch (error) {
    next(error);
  }
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
