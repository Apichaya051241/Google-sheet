const {
    hubQueryMagentoDB
  } = require('./service');
  
  exports.getCategoryProductSlide = (id) => {
    const query = `SELECT * FROM customer_entity`;

    //console.log(query);
    return hubQueryMagentoDB(query);
  };

