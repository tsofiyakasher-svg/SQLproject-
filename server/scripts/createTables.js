const connection = require("../db/connection");
const fs = require("fs");
const path = require("path");

async function createTables() {
  const pathd = path.join(__dirname, "..", "entities");
  let filesArr = fs.readdirSync(pathd);
  filesArr = filesArr.filter((file) => file.endsWith(".json"));
  for (const file of filesArr) {
    try {
      const content = fs.readFileSync(path.join(pathd, file));
      const parsedContent = JSON.parse(content);
      const tableTitle = path.parse(file).name;
      let queryString = `CREATE TABLE IF NOT EXISTS ${tableTitle} (\n`;

      let first = true;

      for (const key in parsedContent) {
        if (!first) queryString += ",\n";
        if (parsedContent[key].includes("FOREIGN KEY")) {
          queryString += `  ${key} ${parsedContent[key].split(" ")[0]}`;
          queryString += ` ,FOREIGN KEY (${key}) REFERENCES ${
            key.split("_")[0]
          }(id)`;
        } else {
          queryString += `  ${key} ${parsedContent[key]}`;
        }
        first = false;
      }

      queryString += `\n);`;
      console.log(queryString);
      await connection.promise().query(queryString);
    } catch (err) {
      console.log(err);
    }
  }
  connection.end();
}
module.exports = { createTables };

createTables();
