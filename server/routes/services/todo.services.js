const connection = require("../../db/connection");
function getAllTodos(reqId) {
  console.log("userId:", reqId);
  const query = `SELECT * FROM todo WHERE user_id=${reqId}`;
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

function updateTodo(title, completed, id) {
  if (completed === true) completed = 1;
  if (completed === false) completed = 0;

  let query = "UPDATE todo SET ";

  if (title !== undefined) query += `title='${title}', `;
  if (completed !== undefined) query += `completed='${completed}', `;

  query = query.slice(0, -2);

  query += ` WHERE id='${id}'`;

  return new Promise((resolve, reject) => {
    connection.query(query, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
}

module.exports = { getAllTodos, createTodo, deleteTodo, updateTodo };
