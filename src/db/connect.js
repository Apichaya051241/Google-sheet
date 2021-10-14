var mysql = require("mysql");
/**
 * Create MySQL Pool for wait connect.
 */
var pool = mysql.createPool({
  connectionLimit: 10,
  host: "185.78.165.11",
  user: "proplugin_user",
  password: "7sy^&a*@;Nln",
  database: 'proplugin_db',
  port: 3306,
});

module.exports = pool;