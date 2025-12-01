const express = require("express");
const router = express.Router();
const connection = require("../db/connection");
const loginService = require("../routes/services/login.services");

router.post("/login", async (req, res) => {
  const { user_name, password } = req.body;
  //   console.log("eeeee");
  try {
    const results = await loginService.getPassword(user_name);
    if (results.length === 0) {
      return res.status(400).json({ message: "User not found" });
    }
    if (results[0].password === password) {
      return res.json({ message: "Login successful" });
    } else {
      return res.status(400).json({ message: "Incorrect password" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
