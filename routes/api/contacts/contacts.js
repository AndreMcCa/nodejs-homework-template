const express = require("express");
const router = express.Router();
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../../controllers/controllerContacts");
const guard = require("../../../helpers/guard");
const validate = require("./validation");

router
  .get("/", guard, listContacts)
  .post("/", guard, validate.createContact, addContact);

router
  .get("/:contactId", guard, getContactById)
  .delete("/:contactId", guard, removeContact)
  .patch("/:contactId", validate.updateContact, guard, updateContact);

module.exports = router;
