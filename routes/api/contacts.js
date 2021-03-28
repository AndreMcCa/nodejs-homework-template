const express = require("express");
const router = express.Router();

const validate = require("../validation/validation");

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../controllers/controllerContacts");

router.get("/", listContacts).post("/", validate.createContact, addContact);

router
  .get("/:contactId", getContactById)
  .delete("/:contactId", removeContact)
  .patch("/:contactId", validate.updateContact, updateContact);

module.exports = router;
