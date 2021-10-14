const {
    hubQueryMagentoDB2
  } = require('./service');
  
  exports.getCategoryProductSlide2 = (id) => {
    const query = `SELECT cae.*,
    case 
        WHEN ce.entity_id IS NOT NULL THEN 1
        ELSE 0
    END AS _address_default_shipping_,
    case 
        WHEN ce2.entity_id IS NOT NULL THEN 1
        ELSE 0
    END AS _address_default_billing_
    FROM customer_address_entity cae
    LEFT JOIN customer_entity ce ON ce.default_shipping = cae.entity_id AND cae.parent_id = ce.entity_id 
    LEFT JOIN customer_entity ce2 ON ce2.default_billing = cae.entity_id AND cae.parent_id = ce2.entity_id`;

    //console.log(query);
    return hubQueryMagentoDB2(query);
  };