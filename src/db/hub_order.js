const { hubQueryMagentoDB } = require("./service");

exports.getOrder = (id) => {
  const query = `SELECT *, sosl.status AS status_label, 
	soi.item_id AS "item:item_id", 
	soi.order_id AS "item:order_id", 
	soi.parent_item_id AS "item:parent_item_id",
	soi.quote_item_id AS  "item:quote_item_id" ,
	soi.store_id AS  "item:store_id" ,
  	soi.created_at AS "item:created_at" ,
  	soi.updated_at AS "item:updated_at" ,
  	soi.product_id AS "item:product_id",
  	soi.product_type AS "item:product_type" ,
  	soi.product_options AS "item:product_options" ,
  	soi.weight AS  "item:weight" ,
  	soi.is_virtual AS "item:is_virtual" ,
  	soi.sku AS  "item:sku" ,
  	soi.name AS "item:name",
  	soi.description AS "item:description" ,
  	soi.applied_rule_ids AS  "item:applied_rule_ids" ,
  	soi.additional_data AS  "item:additional_data" ,
  	soi.is_qty_decimal AS  "item:is_qty_decimal" ,
  	soi.no_discount AS  "item:no_discount" ,
  	soi.qty_backordered AS  "item:qty_backordered" ,
  	soi.qty_canceled AS  "item:qty_canceled" ,
  	soi.qty_invoiced AS  "item:qty_invoiced" ,
  	soi.qty_ordered AS  "item:qty_ordered" ,
  	soi.qty_refunded AS  "item:qty_refunded" ,
  	soi.qty_shipped AS  "item:qty_shipped" ,
  	soi.base_cost AS  "item:base_cost",
  	soi.price AS  "item:price" ,
  	soi.base_price AS  "item:base_price" ,
  	soi.original_price AS  "item:original_price" ,
  	soi.base_original_price AS  "item:base_original_price" ,
  	soi.tax_percent AS  "item:tax_percent" ,
  	soi.tax_amount AS  "item:tax_amount" ,
  	soi.base_tax_amount AS  "item:base_tax_amount" ,
  	soi.tax_invoiced AS  "item:tax_invoiced" ,
  	soi.base_tax_invoiced AS  "item:base_tax_invoiced" ,
  	soi.discount_percent AS  "item:discount_percent" ,
  	soi.discount_amount AS  "item:discount_amount" ,
  	soi.base_discount_amount AS  "item:base_discount_amount" ,
  	soi.discount_invoiced AS  "item:discount_invoiced" ,
  	soi.base_discount_invoiced AS  "item:base_discount_invoiced" ,
  	soi.amount_refunded AS  "item:amount_refunded" ,
  	soi.base_amount_refunded AS  "item:base_amount_refunded" ,
  	soi.row_total AS  "item:row_total" ,
  	soi.base_row_total AS  "item:base_row_total" ,
  	soi.row_invoiced AS  "item:row_invoiced" ,
  	soi.base_row_invoiced AS  "item:base_row_invoiced" ,
  	soi.row_weight AS  "item:row_weight" ,
  	soi.base_tax_before_discount AS  "item:base_tax_before_discount" ,
  	soi.tax_before_discount AS  "item:tax_before_discount" ,
  	soi.ext_order_item_id AS  "item:ext_order_item_id" ,
  	soi.locked_do_invoice AS  "item:locked_do_invoice" ,
  	soi.locked_do_ship AS  "item:locked_do_ship" ,
  	soi.price_incl_tax AS  "item:price_incl_tax" ,
  	soi.base_price_incl_tax AS  "item:base_price_incl_tax" ,
  	soi.row_total_incl_tax AS  "item:row_total_incl_tax" ,
  	soi.base_row_total_incl_tax AS  "item:base_row_total_incl_tax" ,
  	soi.discount_tax_compensation_amount AS  "item:discount_tax_compensation_amount" ,
  	soi.base_discount_tax_compensation_amount AS  "item:base_discount_tax_compensation_amount" ,
  	soi.discount_tax_compensation_invoiced AS  "item:discount_tax_compensation_invoiced" ,
  	soi.base_discount_tax_compensation_invoiced AS  "item:base_discount_tax_compensation_invoiced" ,
  	soi.discount_tax_compensation_refunded AS  "item:discount_tax_compensation_refunded" ,
  	soi.base_discount_tax_compensation_refunded AS  "item:base_discount_tax_compensation_refunded" ,
  	soi.tax_canceled AS  "item:tax_canceled" ,
  	soi.discount_tax_compensation_canceled AS  "item:discount_tax_compensation_canceled" ,
  	soi.tax_refunded AS  "item:tax_refunded" ,
  	soi.base_tax_refunded AS  "item:base_tax_refunded" ,
  	soi.discount_refunded AS  "item:discount_refunded" ,
  	soi.base_discount_refunded AS  "item:base_discount_refunded" ,
  	soi.free_shipping AS  "item:free_shipping" ,
  	soi.weee_tax_applied AS  "item:weee_tax_applied" ,
  	soi.weee_tax_applied_amount AS  "item:weee_tax_applied_amount" ,
  	soi.weee_tax_applied_row_amount AS  "item:weee_tax_applied_row_amount" ,
  	soi.weee_tax_disposition AS  "item:weee_tax_disposition" ,
  	soi.weee_tax_row_disposition AS  "item:weee_tax_row_disposition" ,
  	soi.base_weee_tax_applied_amount AS  "item:base_weee_tax_applied_amount" ,
  	soi.base_weee_tax_applied_row_amnt AS  "item:base_weee_tax_applied_row_amnt" ,
  	soi.base_weee_tax_disposition AS  "item:base_weee_tax_disposition" ,
  	soi.base_weee_tax_row_disposition AS  "item:base_weee_tax_row_disposition" ,
  	soi.gift_message_id AS  "item:gift_message_id" ,
  	soi.gift_message_available AS  "item:gift_message_available" ,
  	soi.rewardpoints_earn AS  "item:rewardpoints_earn" ,
  	soi.rewardpoints_spent AS  "item:rewardpoints_spent" ,
  	soi.rewardpoints_base_discount AS  "item:rewardpoints_base_discount" ,
  	soi.rewardpoints_discount AS  "item:rewardpoints_discount" ,
  	soi.magestore_base_discount AS  "item:magestore_base_discount" ,
  	soi.magestore_discount AS  "item:magestore_discount" ,
  	soa.entity_id AS "address: entity_id", 
	soa.parent_id AS "address:parent_id", 
	soa.customer_address_id AS "address: customer_address_id",
    soa.quote_address_id AS "address: quote_address_id", 
	soa.region_id AS "address: region_id", 
	soa.customer_id AS "address: customer_id",
    soa.fax AS "address: fax", 
	soa.region AS "address: region", 
	soa.postcode AS "address: postcode", 
	soa.lastname AS "address: lastname", 
	soa.street AS "address: street",
    soa.city AS "address: city", 
	soa.email AS "address: email",
	soa.telephone AS "address: telephone", 
	soa.country_id AS "address: country_id", 
    soa.firstname AS "address: firstname", 
	soa.address_type AS "address: address_type",
 	soa.prefix AS "address: prefix", 
	soa.middlename AS "address: middlename",
    soa.suffix AS "address: suffix", 
	soa.company AS "address: company", 
	soa.vat_id AS "address: vat_id", 
	soa.vat_is_valid AS  "address: vat_is_valid", 
    soa.vat_request_id AS  "address: vat_request_id", 
	soa.vat_request_date AS "address: vat_request_date", 
	soa.vat_request_success AS  "address: vat_request_success",
	sop.entity_id AS "payment:entity_id",
	sop.parent_id AS "payment:parent_id",
	sop.base_shipping_captured AS "payment:base_shipping_captured",
	sop.shipping_captured AS "payment:shipping_captured",
	sop.amount_refunded AS "payment:amount_refunded",
	sop.base_amount_paid AS "payment:base_amount_paid",
	sop.amount_canceled AS "payment:amount_canceled",
	sop.base_amount_authorized AS "payment:base_amount_authorized",
	sop.base_amount_paid_online AS "payment:base_amount_paid_online",
	sop.base_amount_refunded_online AS "payment:base_amount_refunded_online",
	sop.base_shipping_amount AS "payment:base_shipping_amount",
	sop.shipping_amount AS "payment:shipping_amount",
	sop.amount_paid AS "payment:amount_paid",
	sop.amount_authorized AS "payment:amount_authorized",
	sop.base_amount_ordered AS "payment:base_amount_ordered",
	sop.base_shipping_refunded AS "payment:base_shipping_refunded",
	sop.shipping_refunded AS "payment:shipping_refunded",
	sop.base_amount_refunded AS "payment:base_amount_refunded",
	sop.amount_ordered AS "payment:amount_ordered",
	sop.base_amount_canceled AS "payment:base_amount_canceled",
	sop.quote_payment_id AS "payment:quote_payment_id",
	sop.additional_data AS "payment:additional_data",
	sop.cc_exp_month AS "payment:cc_exp_month",
	sop.cc_ss_start_year AS "payment:cc_ss_start_year",
	sop.echeck_bank_name AS "payment:echeck_bank_name",
	sop.method AS "payment:method",
	sop.cc_debug_request_body AS "payment:cc_debug_request_body",
	sop.cc_secure_verify AS "payment:cc_secure_verify",
	sop.protection_eligibility AS "payment:protection_eligibility",
	sop.cc_approval AS "payment:cc_approval",
	sop.cc_last_4 AS "payment:cc_last_4",
	sop.cc_status_description AS "payment:cc_status_description",
	sop.echeck_type AS "payment:echeck_type",
	sop.cc_debug_response_serialized AS "payment:cc_debug_response_serialized",
	sop.cc_ss_start_month AS "payment:cc_ss_start_month",
	sop.echeck_account_type AS "payment:echeck_account_type",
	sop.last_trans_id AS "payment:last_trans_id",
	sop.cc_cid_status AS "payment:cc_cid_status",
	sop.cc_owner AS "payment:cc_owner",
	sop.cc_type AS "payment:cc_type",
	sop.po_number AS "payment:po_number",
	sop.cc_exp_year AS "payment:cc_exp_year",
	sop.cc_status AS "payment:cc_status",
	sop.echeck_routing_number AS "payment:echeck_routing_number",
	sop.account_status AS "payment:account_status",
	sop.anet_trans_method AS "payment:anet_trans_method",
	sop.cc_debug_response_body AS "payment:cc_debug_response_body",
	sop.cc_ss_issue AS "payment:cc_ss_issue",
	sop.echeck_account_name AS "payment:echeck_account_name",
	sop.cc_avs_status AS "payment:cc_avs_status",
	sop.cc_number_enc AS "payment:cc_number_enc",
	sop.cc_trans_id AS "payment:cc_trans_id",
	sop.address_status AS "payment:address_status",
	sop.additional_information AS "payment:additional_information",
	spt.transaction_id AS "transaction:transaction_id", 
	spt.parent_id AS  "transaction: parent_id" , 
	spt.order_id  AS "transaction: order_id",
	spt.payment_id AS "transaction: payment_id",
	spt.txn_id AS "transaction:txn_id",
	spt.parent_txn_id AS "transaction:parent_txn_id",
	spt.txn_type AS "transaction:txn_type",
	spt.is_closed AS "transaction:is_closed",
	spt.additional_information AS "transaction:additional_information",
	spt.created_at AS "transaction:created_at",
	ss.entity_id AS "shipment:entity_id",
	ss.store_id AS "shipment:store_id",
	ss.total_weight AS "shipment:total_weight",
	ss.total_qty AS "shipment:total_qty",
	ss.email_sent AS "shipment:email_sent",
	ss.send_email AS "shipment:send_email",
	ss.order_id AS "shipment:order_id",
	ss.customer_id AS "shipment:customer_id",
	ss.shipping_address_id AS "shipment:shipping_address_id",
	ss.billing_address_id AS "shipment:billing_address_id",
	ss.shipment_status AS "shipment:shipment_status",
	ss.increment_id AS "shipment:increment_id",
	ss.created_at AS "shipment:created_at",
	ss.updated_at AS "shipment:updated_at",
	ss.packages AS "shipment:packages",
	ss.shipping_label AS "shipment:shipping_label",
	ss.customer_note AS "shipment:customer_note",
	ss.customer_note_notify AS "shipment:customer_note_notify",
	ssi.entity_id AS  "shipment_item:entity_id",
	ssi.parent_id AS  "shipment_item:parent_id",
	ssi.row_total AS "shipment_item:row_total",
	ssi.price AS "shipment_item:price",
	ssi.weight AS "shipment_item:weight",
	ssi.qty AS "shipment_item:qty",
	ssi.product_id AS "shipment_item:product_id",
	ssi.order_item_id AS "shipment_item:order_item_id",
	ssi.additional_data AS "shipment_item:additional_data",
	ssi.description AS "shipment_item:description",
	ssi.name AS "shipment_item:name",
	ssi.sku AS "shipment_item:sku",
	ssc.entity_id AS "shipment_comment:entity_id",
	ssc.parent_id AS "shipment_comment:parent_id",
	ssc.is_customer_notified AS "shipment_comment:is_customer_notified",
	ssc.is_visible_on_front AS "shipment_comment:is_visible_on_front",
	ssc.comment AS "shipment_comment:comment",
	ssc.created_at AS "shipment_comment:created_at",
	sst.entity_id AS "shipment_track:entity_id",
	sst.parent_id AS "shipment_track:parent_id",
	sst.weight AS "shipment_track:weight",
	sst.qty AS "shipment_track:qty",
	sst.order_id AS "shipment_track:order_id",
	sst.track_number AS "shipment_track:track_number",
	sst.description AS "shipment_track:description",
	sst.title AS "shipment_track:title",
	sst.carrier_code AS "shipment_track:carrier_code",
	sst.created_at AS "shipment_track:created_at",
	sst.updated_at AS "shipment_track:updated_at",
	si.entity_id AS "invoice: entity_id", 
	si.store_id AS  "invoice: store_id", 
	si.base_grand_total AS "invoice: base_grand_total",
    si.shipping_tax_amount AS "invoice: shipping_tax_amount", 
	si.tax_amount AS "invoice: tax_amount", 
	si.base_tax_amount AS  "invoice: base_tax_amount",
    si.store_to_order_rate AS "invoice: store_to_order_rate", 
	si.base_shipping_tax_amount AS  "invoice: base_shipping_tax_amount", 
    si.base_discount_amount AS "invoice: base_discount_amount", 
	si.base_to_order_rate AS "invoice: base_to_order_rate", 
	si.grand_total AS "invoice: grand_total",
    si.shipping_amount AS "invoice: shipping_amount", 
	si.subtotal_incl_tax AS "invoice: subtotal_incl_tax",
 	si.base_subtotal_incl_tax AS "invoice: base_subtotal_incl_tax",
    si.store_to_base_rate AS "invoice: store_to_base_rate", 
	si.base_shipping_amount AS "invoice: base_shipping_amount", 
	si.total_qty AS "invoice: total_qty",
    si.base_to_global_rate AS "invoice: base_to_global_rate", 
	si.subtotal AS "invoice: subtotal",
 	si.base_subtotal AS "invoice: base_subtotal", 
    si.discount_amount AS "invoice: discount_amount", 
	si.billing_address_id AS  "invoice: billing_address_id", 
	si.is_used_for_refund AS "invoice: is_used_for_refund",
    si.order_id AS "invoice: order_id", 
	si.email_sent AS "invoice: email_sent", 
	si.send_email AS "invoice: send_email", 
	si.can_void_flag AS "invoice: can_void_flag",
    si.state AS "invoice: state", 
	si.shipping_address_id AS "invoice: shipping_address_id",
 	si.store_currency_code AS "invoice: store_currency_code",
    si.transaction_id AS "invoice: transaction_id", 
	si.order_currency_code AS "invoice: order_currency_code", 
	si.base_currency_code AS "invoice: base_currency_code",
    si.global_currency_code AS "invoice: global_currency_code", 
	si.increment_id AS "invoice: increment_id", 
	si.created_at AS "invoice: created_at",
    si.updated_at AS "invoice: updated_at",
 	si.discount_tax_compensation_amount AS "invoice: discount_tax_compensation_amount", 
    si.base_discount_tax_compensation_amount AS "invoice: base_discount_tax_compensation_amount", 
    si.shipping_discount_tax_compensation_amount AS "invoice: shipping_discount_tax_compensation_amount",
    si.base_shipping_discount_tax_compensation_amnt AS "invoice: base_shipping_discount_tax_compensation_amnt",
    si.shipping_incl_tax AS "invoice: shipping_incl_tax",
    si.base_shipping_incl_tax AS "invoice: base_shipping_incl_tax", 
	si.base_total_refunded AS  "invoice: base_total_refunded",
    si.discount_description AS "invoice: discount_description",
    si.customer_note AS "invoice: customer_note",
 	si.customer_note_notify AS "invoice: customer_note_notify", 
    si.rewardpoints_base_discount AS "invoice: rewardpoints_base_discount",
    si.rewardpoints_earn AS  "invoice: rewardpoints_earn", 
	si.rewardpoints_discount AS "invoice: rewardpoints_discount",
	sii.entity_id AS "invoice_item:entity_id",
	sii.parent_id AS "invoice_item:parent_id",
	sii.base_price AS "invoice_item:base_price",
	sii.tax_amount AS "invoice_item:tax_amount",
	sii.base_row_total AS "invoice_item:base_row_total",
	sii.discount_amount AS "invoice_item:discount_amount",
	sii.row_total AS "invoice_item:row_total",
	sii.base_discount_amount AS "invoice_item:base_discount_amount",
	sii.price_incl_tax AS "invoice_item:price_incl_tax",
	sii.base_tax_amount AS "invoice_item:base_tax_amount",
	sii.base_price_incl_tax AS "invoice_item:base_price_incl_tax",
	sii.qty AS "invoice_item:qty",
	sii.base_cost AS "invoice_item:base_cost",
	sii.price AS "invoice_item:price",
	sii.base_row_total_incl_tax AS "invoice_item:base_row_total_incl_tax",
	sii.row_total_incl_tax AS "invoice_item:row_total_incl_tax",
	sii.product_id AS "invoice_item:product_id",
	sii.order_item_id AS "invoice_item:order_item_id",
	sii.additional_data AS "invoice_item:additional_data",
	sii.description AS "invoice_item:description",
	sii.sku AS "invoice_item:sku",
	sii.name AS "invoice_item:name",
	sii.discount_tax_compensation_amount AS "invoice_item:discount_tax_compensation_amount",
	sii.base_discount_tax_compensation_amount AS "invoice_item:base_discount_tax_compensation_amount",
	sii.tax_ratio AS "invoice_item:tax_ratio",
	sii.weee_tax_applied AS "invoice_item:weee_tax_applied",
	sii.weee_tax_applied_amount AS "invoice_item:weee_tax_applied_amount",
	sii.weee_tax_applied_row_amount AS "invoice_item:weee_tax_applied_row_amount",
	sii.weee_tax_disposition AS "invoice_item:weee_tax_disposition",
	sii.weee_tax_row_disposition AS "invoice_item:weee_tax_row_disposition",
	sii.base_weee_tax_applied_amount AS "invoice_item:base_weee_tax_applied_amount",
	sii.base_weee_tax_applied_row_amnt AS "invoice_item:base_weee_tax_applied_row_amnt",
	sii.base_weee_tax_disposition AS "invoice_item:base_weee_tax_disposition",
	sii.base_weee_tax_row_disposition AS "invoice_item:base_weee_tax_row_disposition",
	sic.entity_id AS "invoice_comment:entity_id",
	sic.parent_id AS "invoice_comment:parent_id",
	sic.is_customer_notified AS "invoice_comment:is_customer_notified",
	sic.is_visible_on_front AS "invoice_comment:is_visible_on_front",
	sic.comment AS "invoice_comment:comment",
	sic.created_at AS "invoice_comment:created_at",
	sc.entity_id AS "creditmemo:entity_id",
	sc.store_id AS "creditmemo:store_id",
	sc.adjustment_positive AS "creditmemo:adjustment_positive",
	sc.base_shipping_tax_amount AS "creditmemo:base_shipping_tax_amount",
	sc.store_to_order_rate AS "creditmemo:store_to_order_rate",
	sc.base_discount_amount AS "creditmemo:base_discount_amount",
	sc.base_to_order_rate AS "creditmemo:base_to_order_rate",
	sc.grand_total AS "creditmemo:grand_total",
	sc.base_adjustment_negative AS "creditmemo:base_adjustment_negative",
	sc.base_subtotal_incl_tax AS "creditmemo:base_subtotal_incl_tax",
	sc.shipping_amount AS "creditmemo:shipping_amount",
	sc.subtotal_incl_tax AS "creditmemo:subtotal_incl_tax",
	sc.adjustment_negative AS "creditmemo:adjustment_negative",
	sc.base_shipping_amount AS "creditmemo:base_shipping_amount",
	sc.store_to_base_rate AS "creditmemo:store_to_base_rate",
	sc.base_to_global_rate AS "creditmemo:base_to_global_rate",
	sc.base_adjustment AS "creditmemo:base_adjustment",
	sc.base_subtotal AS "creditmemo:base_subtotal",
	sc.discount_amount AS "creditmemo:discount_amount",
	sc.subtotal AS "creditmemo:subtotal",
	sc.adjustment AS "creditmemo:adjustment",
	sc.base_grand_total AS "creditmemo:base_grand_total",
	sc.base_adjustment_positive AS "creditmemo:base_adjustment_positive",
	sc.base_tax_amount AS "creditmemo:base_tax_amount",
	sc.shipping_tax_amount AS "creditmemo:shipping_tax_amount",
	sc.tax_amount AS "creditmemo:tax_amount",
	sc.order_id AS "creditmemo:order_id",
	sc.email_sent AS "creditmemo:email_sent",
	sc.send_email AS "creditmemo:send_email",
	sc.creditmemo_status AS "creditmemo:creditmemo_status",
	sc.state AS "creditmemo:state",
	sc.shipping_address_id AS "creditmemo:shipping_address_id",
	sc.billing_address_id AS "creditmemo:billing_address_id",
	sc.invoice_id AS "creditmemo:invoice_id",
	sc.store_currency_code AS "creditmemo:store_currency_code",
	sc.order_currency_code AS "creditmemo:order_currency_code",
	sc.base_currency_code AS "creditmemo:base_currency_code",
	sc.global_currency_code AS  "creditmemo:global_currency_code",
	sc.transaction_id AS "creditmemo:transaction_id",
	sc.increment_id AS "creditmemo:increment_id",
	sc.created_at AS "creditmemo:created_at",
	sc.updated_at AS "creditmemo:updated_at",
	sc.discount_tax_compensation_amount AS "creditmemo:discount_tax_compensation_amount",
	sc.base_discount_tax_compensation_amount AS "creditmemo:base_discount_tax_compensation_amount",
	sc.shipping_discount_tax_compensation_amount AS "creditmemo:shipping_discount_tax_compensation_amount",
	sc.base_shipping_discount_tax_compensation_amnt AS "creditmemo:base_shipping_discount_tax_compensation_amnt",
	sc.shipping_incl_tax AS "creditmemo:shipping_incl_tax",
	sc.base_shipping_incl_tax AS"creditmemo:base_shipping_incl_tax",
	sc.discount_description AS "creditmemo:discount_description",
	sc.customer_note AS "creditmemo:customer_note",
	sc.customer_note_notify AS "creditmemo:customer_note_notify",
	sc.rewardpoints_base_discount AS "creditmemo:rewardpoints_base_discount",
	sc.rewardpoints_earn AS "creditmemo:rewardpoints_earn",
	sc.rewardpoints_discount AS "creditmemo:rewardpoints_discount",
	sci.entity_id AS "creditmemo_item:entity_id",
	sci.parent_id AS "creditmemo_item:parent_id",
	sci.base_price AS "creditmemo_item:base_price",
	sci.tax_amount AS "creditmemo_item:tax_amount",
	sci.base_row_total AS "creditmemo_item:base_row_total",
	sci.discount_amount AS "creditmemo_item:discount_amount",
	sci.row_total AS "creditmemo_item:row_total",
	sci.base_discount_amount AS "creditmemo_item:base_discount_amount",
	sci.price_incl_tax AS "creditmemo_item:price_incl_tax",
	sci.base_tax_amount AS "creditmemo_item:base_tax_amount",
	sci.base_price_incl_tax AS "creditmemo_item:base_price_incl_tax",
	sci.qty AS "creditmemo_item:qty",
	sci.base_cost AS "creditmemo_item:base_cost",
	sci.price AS "creditmemo_item:price",
	sci.base_row_total_incl_tax AS "creditmemo_item: base_row_total_incl_tax",
	sci.row_total_incl_tax AS "creditmemo_item: row_total_incl_tax",
	sci.product_id AS "creditmemo_item:product_id",
	sci.order_item_id AS "creditmemo_item:order_item_id",
	sci.additional_data AS "creditmemo_item:additional_data",
	sci.description AS "creditmemo_item:description",
	sci.sku AS "creditmemo_item:sku",
	sci.name AS "creditmemo_item:name",
	sci.discount_tax_compensation_amount AS "creditmemo_item:discount_tax_compensation_amount",
	sci.base_discount_tax_compensation_amount AS "creditmemo_item:base_discount_tax_compensation_amount",
	sci.tax_ratio AS "creditmemo_item:tax_ratio",
	sci.weee_tax_applied AS "creditmemo_item:weee_tax_applied",
	sci.weee_tax_applied_amount AS "creditmemo_item:weee_tax_applied_amount",
	sci.weee_tax_applied_row_amount AS "creditmemo_item:weee_tax_applied_row_amount",
	sci.weee_tax_disposition AS "creditmemo_item:weee_tax_disposition",
	sci.weee_tax_row_disposition AS "creditmemo_item:weee_tax_row_disposition",
	sci.base_weee_tax_applied_amount AS "creditmemo_item:base_weee_tax_applied_amount",
	sci.base_weee_tax_applied_row_amnt AS "creditmemo_item:base_weee_tax_applied_row_amnt",
	sci.base_weee_tax_disposition AS "creditmemo_item:base_weee_tax_disposition",
	sci.base_weee_tax_row_disposition AS "creditmemo_item:base_weee_tax_row_disposition",
	scc.entity_id AS "creditmemo_comment:entity_id",
	scc.parent_id AS "creditmemo_comment:parent_id",
	scc.is_customer_notified AS "creditmemo_comment:is_customer_notified",
	scc.is_visible_on_front AS "creditmemo_comment:is_visible_on_front",
	scc.comment AS "creditmemo_comment:comment",
	scc.created_at AS "creditmemo_comment:created_at",
	sosh.entity_id AS "status_history:entity_id",
	sosh.parent_id AS "status_history:parent_id",
	sosh.is_customer_notified AS "status_history:is_customer_notified",
	sosh.is_visible_on_front AS "status_history:is_visible_on_front",
	sosh.comment AS "status_history:comment",
	sosh.status AS "status_history:status",
	sosh.created_at AS "status_history:created_at",
	sosh.entity_name AS "status_history:entity_name",
	sot.tax_id AS "tax:tax_id",
	sot.order_id AS "tax:order_id",
	sot.code AS "tax:code",
	sot.title AS "tax:title",
	sot.percent AS "tax:percent",
	sot.amount AS "tax:amount",
	sot.priority AS "tax:priority",
	sot.position AS "tax:position",
	sot.base_amount AS "tax:base_amount",
	sot.process AS "tax:process",
	sot.base_real_amount AS "tax:base_real_amount",
	soti.tax_item_id AS "tax_item:tax_item_id",
	soti.tax_id AS "tax_item:tax_id",
	soti.item_id AS "tax_item:item_id",
	soti.tax_percent AS "tax_item:tax_percent",
	soti.amount AS "tax_item:amount",
	soti.base_amount AS "tax_item:base_amount",
	soti.real_amount AS "tax_item:real_amount",
	soti.real_base_amount AS "tax_item:real_base_amount",
	soti.associated_item_id AS "tax_item:associated_item_id",
	soti.taxable_item_type AS "tax_item:taxable_item_type"
FROM sales_order so 
LEFT JOIN sales_order_status_label sosl ON sosl.store_id = so.entity_id 
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
LEFT JOIN sales_creditmemo_item sci ON sci.parent_id = sc.entity_id 
LEFT JOIN sales_creditmemo_comment scc ON scc.parent_id = sc.entity_id 
LEFT JOIN sales_order_status_history sosh ON sosh.parent_id = so.entity_id 
LEFT JOIN sales_order_tax sot ON sot.order_id = so.entity_id 
LEFT JOIN sales_order_tax_item soti ON soti.tax_id = sot.order_id 
GROUP BY so.entity_id`;

  //console.log(query);
  return hubQueryMagentoDB(query);
};
