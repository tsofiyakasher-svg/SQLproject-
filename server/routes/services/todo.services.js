const connection = require("../../db/connection");
function getAllTodos(user_id) {
  const query = `SELECT * FROM todo WHERE user_id='${user_id}'`;
  return new Promise((resolve, reject) => {
    connection.query(query, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
}

function createTodo(user_id, title, completed) {
  const query = ` INSERT INTO todo (user_id,title,completed) VALUES (${user_id},'${title}', '${completed}')`;
  return new Promise((resolve, reject) => {
    connection.query(query, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
}

function deleteTodo(id) {
  const query = `DELETE FROM todo WHERE id='${id}'`;
  return new Promise((resolve, reject) => {
    connection.query(query, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
}

function updateTodo(user_id, title, completed, id) {
  const query = `UPDATE todo SET title='${title}', completed='${completed}' WHERE id='${id}'`;
  return new Promise((resolve, reject) => {
    connection.query(query, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
}

module.exports = { getAllTodos, createTodo, deleteTodo, updateTodo };
