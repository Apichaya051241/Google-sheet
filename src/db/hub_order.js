const { hubQueryMagentoDB } = require("./service");

exports.getOrder = (id) => {
  const query = `SELECT *    
FROM sales_order so 
LEFT JOIN sales_order_status_label  sosl ON sosl.store_id = so.entity_id 
LEFT JOIN sales_order_item soi ON soi.order_id = so.entity_id 
LEFT JOIN sales_order_address soa ON soa.parent_id = so.entity_id 
LEFT JOIN sales_order_payment sop ON sop.parent_id = so.entity_id 
LEFT JOIN sales_payment_transaction spt  ON spt.parent_id = so.entity_id 
LEFT JOIN sales_shipment ss ON ss.order_id = so.entity_id 
LEFT JOIN sales_shipment_item ssi ON ssi.parent_id = ssi.entity_id 
LEFT JOIN sales_shipment_comment ssc ON ssc.parent_id = ssi.entity_id 
LEFT JOIN sales_shipment_track sst ON sst.order_id = ssi.entity_id 
LEFT JOIN sales_invoice si ON si.order_id = so.entity_id 
LEFT JOIN sales_invoice_item sii ON sii.parent_id = si.entity_id 
LEFT JOIN sales_invoice_comment sic ON sic.parent_id = si.entity_id 
LEFT JOIN sales_creditmemo sc ON sc.order_id = so.entity_id 
LEFT JOIN sales_creditmemo_comment scc ON scc.parent_id = sc.entity_id 
LEFT JOIN sales_order_status_history sosh ON sosh.parent_id = so.entity_id 
LEFT JOIN sales_order_tax sot ON sot.order_id = so.entity_id 
LEFT JOIN sales_order_tax_item soti ON soti.tax_id = sot.order_id 
GROUP BY so.entity_id `;

  //console.log(query);
  return hubQueryMagentoDB(query);
};
