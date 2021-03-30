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

router.get("/", guard, listContacts).post("/", guard, addContact);

router
  .get("/:contactId", guard, getContactById)
  .delete("/:contactId", guard, removeContact)
  .patch("/:contactId", guard, updateContact);

module.exports = router;
