const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const passport = require('passport')
const passportConfig = require('../config/passport-config.js')
const authRouter = require("../users/auth-router.js");
const usersRouter = require("../users/users-router.js");

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(passport.initialize())

server.use("/api/auth", authRouter);
server.use("/api/users", usersRouter);

server.get("/", (req, res) => {
  res.send("GET is working correctly!");
});

module.exports = server;
