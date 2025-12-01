const express = require("express");
const router = express.Router();
const connection = require("../db/connection");
const postService = require("./services/post.services");

router.get("/", async (req, res) => {
  try {
    const reqId = req.body;
    const posts = await postService.getAllPost(reqId.user_id);
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

router.post("/add-post", async (req, res) => {
  try {
    const reqDetails = req.body;
    const post = await postService.createPost(
      reqDetails.user_id,
      reqDetails.title,
      reqDetails.body
    );
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

router.delete("/delete-post", async (req, res) => {
  try {
    const reqId = req.body;
    const post = await postService.deletePost(reqId.id);
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

router.put("/update-post", async (req, res) => {
  try {
    const reqDetails = req.body;
    const post = await postService.updatePostBody(
      reqDetails.user_id,
      reqDetails.title,
      reqDetails.body,
      reqDetails.id
    );
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

module.exports = router;
