const connection = require("../../db/connection");
function userExist(user_name) {
  const query = `SELECT user_name FROM user WHERE user_name = '${user_name}';`;
  return new Promise((resolve, reject) => {
    connection.query(query, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
}
function addUser(user_name, password, email, phone) {
  return new Promise((resolve, reject) => {
    const userquery = `INSERT INTO user (user_name, email, phone) VALUES ('${user_name}', '${email}', '${phone}');`;
    connection.query(userquery, (err, result) => {
      if (err) return reject(err);
      const userId = result.insertId;
      const passwordquery = `INSERT INTO password (user_id, password) VALUES (${userId}, '${password}');`;
      connection.query(passwordquery, (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  });
}

module.exports = { userExist, addUser };
