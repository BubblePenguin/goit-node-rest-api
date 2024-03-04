import express from "express";
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
} from "../controllers/contactsControllers.js";
import CtrlWrap from "../helpers/CtrlWrap.js";

const contactsRouter = express.Router();

contactsRouter.get("/", CtrlWrap(getAllContacts));

contactsRouter.get("/:id", CtrlWrap(getOneContact));

contactsRouter.delete("/:id", CtrlWrap(deleteContact));

contactsRouter.post("/", CtrlWrap(createContact));

contactsRouter.put("/:id", CtrlWrap(updateContact));

export default contactsRouter;
