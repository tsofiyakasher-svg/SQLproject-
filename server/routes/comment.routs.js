const express = require("express");
const router = express.Router();
const connection = require("../db/connection");
const commentService = require("../routes/services/comment.services");

module.exports = router;
