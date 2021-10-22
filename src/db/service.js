const pool = require("../db/connect");

exports.hubQueryMagentoDB = (query) => {
  try {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        connection.query(query, (err, result) => {
          if (err) {
            console.error({
              query: `${query}`,
              error: err
            });
            reject(err);
          }
          resolve(result);
        });
        if (err) {
          console.error(err);
          reject(err);
        }
        connection.release();
      });
    });
  }catch (error) {
    console.error("Query error :: ", error);
  }
};



