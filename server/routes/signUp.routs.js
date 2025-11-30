const express = require("express");
const router = express.Router();
const connection = require("../db/connection");
const signUpService = require("../routes/services/signUp.service");

module.exports = router;
