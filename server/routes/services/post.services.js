const connection = require("../../db/connection");
function getAllPost(user_id) {
  const query = `SELECT * FROM post WHERE user_id='${user_id}'`;
  return new Promise((resolve, reject) => {
    connection.query(query, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
}
function getAllPosts() {
  const query = `SELECT * FROM post`;
  return new Promise((resolve, reject) => {
    connection.query(query, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
}
function getPost(id) {
  const query = `SELECT * FROM post WHERE id='${id}'`;
  return new Promise((resolve, reject) => {
    connection.query(query, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
}
function createPost(user_id, title, body) {
  const query = ` INSERT INTO post (user_id,title,body) VALUES (${user_id},'${title}', '${body}')`;
  return new Promise((resolve, reject) => {
    connection.query(query, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
}

function deletePost(id) {
  const query = `DELETE FROM post WHERE id='${id}'`;
  return new Promise((resolve, reject) => {
    connection.query(query, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
}

function updatePostTitle(title, id) {
  const query = `UPDATE post SET title='${title}', WHERE id='${id}'`;
  return new Promise((resolve, reject) => {
    connection.query(query, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
}
function updatePostBody(body, id) {
  const query = `UPDATE post SET body='${body}', WHERE id='${id}'`;
  return new Promise((resolve, reject) => {
    connection.query(query, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
}
module.exports = {
  updatePostBody,
  updatePostTitle,
  deletePost,
  createPost,
  getAllPost,
  getPost,
  getAllPosts,
};
