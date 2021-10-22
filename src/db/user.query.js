const {
  hubQueryMagentoDB
} = require('./service');

exports.getUser = (id) => {
  const query = `SELECT email FROM customer_entity `;

  //console.log(query);
  return hubQueryMagentoDB(query);
};

// var mysql = require("mysql");

// exports.getCategoryProductSlide = (id) => {
//   var con = mysql.createConnection({
//     host: "185.78.165.11",
//     user: "proplugin_user",
//     password: "7sy^&a*@;Nln",
//     database: "proplugin_db",
//   });

//   con.connect(function (err) {
//     if (err) throw err;
//     con.query(
//       "SELECT email FROM customer_entity",
//       function (err, result, fields) {
//         if (err) throw err;
//         console.log(result);
//       }
//     );
//   });
// };




