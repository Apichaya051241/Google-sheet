const { GoogleSpreadsheet } = require("google-spreadsheet");
const propluginKey = require("../../proplugin-eb842ee31da8.json");
const { getOrder } = require("../../db/hubquery");

exports.ordercontroller = async (id) => {
  // Initialize the sheet - doc ID is the long id in the sheets URL
  const doc = new GoogleSpreadsheet(
    "1PnFKzIANOB8zD-ZB5sehoExXdMVU6lu_-_b1iRVnXe4"
  );

  let Order = await getOrder();
  // console.log(Order);

  // Initialize Auth - see more available options at https://theoephraim.github.io/node-google-spreadsheet/#/getting-started/authentication
  await doc.useServiceAccountAuth({
    client_email: propluginKey.client_email,
    private_key: propluginKey.private_key,
  });

  // console.log("load sheet");
  await doc.loadInfo();
  // console.log(doc.title);
  const sheet = doc.sheetsByIndex[0];
  const rows = await sheet.getRows();

  let i = 0;
  //  await CheckEntity(rows, sheet.rowCount, data, 0);
  console.log(rows.length);
  console.log(sheet.rowCount);
  while (true) {
    if (i >= rows.length) break;
    console.log("index[i]", i);
    // data.push(rows[i].entity_id);
    Order = Order.filter((item) => {
      if (rows.length > 0) {
        if (rows[i].entity_id) {
          if (item.entity_id !== rows[i].entity_id) return true;
          else {
            console.log(rows[i]);
          }
        }
      } else {
        return true;
      }

      // else { console.log(rows[i]); }
    });

    i += 1;
  }
  console.log(Order);
  await Order.forEach(async (element) => {
    setTimeout(async () => {
      const larryRow = await sheet.addRow(element);
    }, 1000);
  });

  // console.log("larryRow => ", larryRow);
};
