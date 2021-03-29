const mongoose = require("mongoose");
const {Schema, model} = mongoose;

const contactsSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contacts"],
    },
    email: {
      type: String,
      required: [true, "Set email for contacts"],
      unique: true,
    },
    phone: {
      type: String,
      required: [true, "Set phone for contacts"],
      unique: true,
    },
  }
  //   {versionKey: false, timestamps: true}
);

const Contacts = model("contact", contactsSchema);

module.exports = Contacts;
