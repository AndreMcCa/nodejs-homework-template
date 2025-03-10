const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const {HttpCode} = require("./helpers/constants");
const path = require("path");
require("dotenv").config();

const contactsRouter = require("./routes/api/contacts/contacts");
const usersRouter = require("./routes/api/users/users");

const app = express();

const AVATARS_OF_USERS = process.env.AVATARS_OF_USERS;
app.use(express.static(path.join(__dirname, AVATARS_OF_USERS)));

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(helmet());
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json({limit: 10000}));

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  handler: (req, res, next) => {
    return res.status(HttpCode.BAD_REQUEST).json({
      status: "error",
      code: HttpCode.BAD_REQUEST,
      data: "Forbidden",
      message: "Too many requests,please try later",
    });
  },
});

app.use("/api/", apiLimiter);

app.use("/api/users", usersRouter);
app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({message: "Not found"});
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({message: err.message});
});

module.exports = app;
