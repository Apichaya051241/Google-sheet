//const { addresscontroller } = require('./src/controller/address.controller');
const {usercontroller} = require('./src/controller/user.controller');
const cron = require('node-cron')

cron.schedule('* * * * *', () => {  
    usercontroller();
    //addresscontroller();
    console.log('running a task every minute');
});
