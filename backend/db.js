const mysql = require('mysql2');
const db = mysql.createConnection({
  host: 'db', // Use the service name here
  user: 'root',
  password: 'root',
  database: 'speedometer',
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database!');
});

module.exports = db;
