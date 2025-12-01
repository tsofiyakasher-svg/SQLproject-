const connection = require("../../db/connection");

function getPassword(userName) {
  const query = `
    SELECT 
      u.id, 
      u.user_name, 
      u.email, 
      u.phone,
      p.password 
    FROM user AS u 
    INNER JOIN password AS p ON u.id = p.user_id 
    WHERE u.user_name ='${userName}';
  `;
  return new Promise((resolve, reject) => {
    connection.query(query, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
}
module.exports = { getPassword };
