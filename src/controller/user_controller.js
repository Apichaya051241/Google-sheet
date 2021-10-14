const { GoogleSpreadsheet } = require("google-spreadsheet");
const propluginKey = require("../../proplugin-eb842ee31da8.json");
//const {getCategoryProductSlide} = require('./src/db/hubquery')

exports.usercontroller = async () => {
    // Initialize the sheet - doc ID is the long id in the sheets URL
    const doc = new GoogleSpreadsheet(
      "1v1raNRlYWGzMgKEzrbstwHcPvYnF2otJPXcUmU4nSFM"
    );
  
    // Initialize Auth - see more available options at https://theoephraim.github.io/node-google-spreadsheet/#/getting-started/authentication
    await doc.useServiceAccountAuth({
      client_email: propluginKey.client_email,
      private_key: propluginKey.private_key,
    });
  
    await doc.loadInfo(); // loads document properties and worksheets
    console.log(doc.title);
    await doc.updateProperties({ title: "add renamed doc" });
    const sheet = doc.sheetsByIndex[0];
    await sheet.loadCells("A1:Y4");
    const larryRow = await sheet.addRow({
      email: "ggbbLady@mailki.com",
      _website: "www.proplugin.com",
      _store:"",
      website_id:"",
      store_id:"",
      created_in:"",
      prefix:"Ms.",
      firstname:"kultara",
      middlename:"kun",
      lastname:"wasasin",
      suffix:"",
      group_id:"",
      dob:"1997-10-27",
      password_hash:"",
      rp_token:"",
      rp_token_created_at:"",
      taxvat:"",
      confirmation:"",
      created_at:"",
      gender:"Female",
      disable_auto_group_change:"",
      updated_at:"",
      failures_num:"",
      first_failure:"",
      lock_expires:"",
      password:""
      
    });
    console.log("larryRow => ", larryRow);
  
    /*// read rows
    const rows = await sheet.getRows();
    // read/write row values
    console.log(rows[0]._email); // 'Larry Page'
    rows[1].email = 'sergey@abc.xyz'; // update a value
    await rows[1].save(); // save updates
    await rows[1].delete(); // delete a row */
  };