const { GoogleSpreadsheet } = require("google-spreadsheet");
const propluginKey = require("../../proplugin-eb842ee31da8.json");
//const {getCategoryProductSlide} = require('./db/hubquery');
//const { getCategoryProductSlide2 } = require("./src/db/hub_address");

exports.addresscontroller = async () => {
    // Initialize the sheet - doc ID is the long id in the sheets URL
    const doc = new GoogleSpreadsheet(
      "1698_dmQElYK8g0cYatJ_jh5DFUko5mRZonTcTNo2vAo"
    );
  
    // Initialize Auth - see more available options at https://theoephraim.github.io/node-google-spreadsheet/#/getting-started/authentication
    await doc.useServiceAccountAuth({
      client_email: propluginKey.client_email,
      private_key: propluginKey.private_key,
    });
  
    await doc.loadInfo(); // loads document properties and worksheets
    console.log(doc.title);
    await doc.updateProperties({ title: " renamed add doc" });
    const sheet = doc.sheetsByIndex[0];
    await sheet.loadCells("A1:X1009");
    const larryRow = await sheet.addRow({
      _website:"www.proplugin.com",
      _email:"red@gmail.com",
      _entity_id:"36",
      prefix:"Mr.",
      firstname:"Redon",
      middlename:"count",
      lastname:"kanis",
      suffix:"",
      company:"PA2U",
      street:"20/84",
      city:"วารินชำราบ",
      country_id:"TH",
      region:"อุบลราชธานี",
      region_id:"",
      postcode:"34190",
      telephone:"901235567",
      fax:"",
      vat_id:"",
      vat_is_valid:"",
      vat_request_id:"",
      vat_request_date:"",
      vat_request_success:"",
      _address_default_billing_:"",
      _address_default_shipping_:""
  
      });
      console.log("larryRow => ", larryRow);
  
      //   const rows = await sheet.getRows();
      //   console.log(rows[0]._email);
  
  };