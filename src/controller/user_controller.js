const { query } = require("express");
const { GoogleSpreadsheet } = require("google-spreadsheet");
const propluginKey = require("../../proplugin-eb842ee31da8.json");
//const {getCategoryProductSlide} = require('./src/db/hubquery')
const {getUser} = require('../db/user.query');


exports.usercontroller = async () => {
    // Initialize the sheet - doc ID is the long id in the sheets URL
    const doc = new GoogleSpreadsheet(
      "1v1raNRlYWGzMgKEzrbstwHcPvYnF2otJPXcUmU4nSFM",
    );
    let User =await getUser();
    console.log(User);
    // Initialize Auth - see more available options at https://theoephraim.github.io/node-google-spreadsheet/#/getting-started/authentication
    await doc.useServiceAccountAuth({
      client_email: propluginKey.client_email,
      private_key: propluginKey.private_key,
    });
  
    await doc.loadInfo(); // loads document properties and worksheets
    console.log(doc.title);
    await doc.updateProperties({ title: "user renamed doc" });
    const sheet = doc.sheetsByIndex[0];
    const rows = await sheet.getRows();
    const larryRow = await sheet.addRow({
      email: "",
      _website: "",
      _store:"",
      website_id:"",
      store_id:"",
      created_in:"",
      prefix:"",
      firstname:"",
      middlename:"",
      lastname:"",
      suffix:"",
      group_id:"",
      dob:"",
      password_hash:"",
      rp_token:"",
      rp_token_created_at:"",
      taxvat:"",
      confirmation:"",
      created_at:"",
      gender:"",
      disable_auto_group_change:"",
      updated_at:"",
      failures_num:"",
      first_failure:"",
      lock_expires:"",
      password:""
      
    });
    console.log("larryRow => ", larryRow);
  
    let i = 0;
    while (true) {
      if (i >= rows) break;
      // console.log(rows[i].email);
      // data.push(rows[i].email);
      User = User.filter((item) => item != rows[i].email);
      i += 1;
    }
    console.log(User);
  
  };

  // const CheckEmail = (rows, count, data, index) => {
  //   data.push(rows[index].email);
  //   console.log("rows[index].email ", rows[index].email);
  //   if (index < count) {
  //     index += 1;
  //     CheckEmail(rows, count, data, index);
  //   } else {
  //     return data;
  //   }
  // };

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
    const larryRow = await sheet.addRow({
            _website:"",
            _email:"",
            _entity_id:"",
            prefix:"",
            firstname:"",
            middlename:"",
            lastname:"",
            suffix:"",
            company:"",
            street:"",
            city:"",
            country_id:"",
            region:"",
            region_id:"",
            postcode:"",
            telephone:"",
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

  };
  
  

  // const user = []
  // const data = doc;
  // const results = data.filter((doc, query)=> {
  //   for(let i=0; i<doc.lenght; i++){
  //     if(doc.email != query.email ){
  //       user(doc.id[i]);
  //     }
  //   }
  //   console.log(results);
  // });