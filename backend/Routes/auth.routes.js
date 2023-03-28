const express = require("express");
const { registerApi, loginApi } = require("../Controller/auth.controller");
const app = express.Router();

// signup Route
app.post("/signup", registerApi);
// login  Route
app.post("/login", loginApi);

module.exports = app;
