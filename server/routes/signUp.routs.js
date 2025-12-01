const express = require("express");
const router = express.Router();
const connection = require("../db/connection");
const signUpService = require("../routes/services/signUp.services");

router.post("/signUp", async (req, res) => {
  const { user_name, password, verified, email, phone } = req.body;
  try {
    if (password !== verified) {
      throw new Error("The passwords do not match");
    }
    const results = await signUpService.userExist(user_name);
    if (results.length === 0) {
      const result = await signUpService.addUser(
        user_name,
        password,
        email,
        phone
      );
      result.message = "User created successfully";
      console.log(result);
      return res.json(result);
    } else {
      return res.status(400).json({ message: "The user already exists" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
module.exports = router;
