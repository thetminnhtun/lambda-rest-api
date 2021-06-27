require("dotenv").config({ path: "./.env" });
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

const connectToDatabase = async () => {
  connection.connect((error) => {
    if (error) {
      console.log(`Error::: ${error.message}`);
      throw error;
      // process.exit(1);
    }
    console.log("Database connected as id " + connection.threadId);
  });
};

module.exports = {
  connection,
  connectToDatabase,
};
