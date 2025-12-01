const express = require("express");
const router = express.Router();
const connection = require("../db/connection");
const todoService = require("../routes/services/todo.services");

router.get("/", async (req, res) => {
  try {
    const reqId = req.query.user_id;
    const todos = await todoService.getAllTodos(reqId);
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

router.post("/add-todo", async (req, res) => {
  try {
    const reqDetails = req.body;
    const todos = await todoService.createTodo(
      reqDetails.user_id,
      reqDetails.title,
      reqDetails.completed
    );
    const todo = {
      id: todos.insertId,
      user_id: reqDetails.user_id,
      title: reqDetails.title,
      completed: reqDetails.completed || false,
    };
    res.json(todo);
  } catch (err) {
    console.log(" ERROR:", err);

    res.status(500).json({ error: err });
  }
});

router.delete("/delete-todo", async (req, res) => {
  try {
    const reqId = req.query.user_id;
    const todo = await todoService.deleteTodo(reqId);
    res.json(todo);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

router.patch("/update-todo", async (req, res) => {
  try {
    const reqDetails = req.body;
    const todo = await todoService.updateTodo(
      reqDetails.title,
      reqDetails.completed,
      reqDetails.id
    );
    res.json(todo);
  } catch (err) {
    console.log("UPDATE ERROR:", err);

    res.status(500).json({ error: err });
  }
});

module.exports = router;
