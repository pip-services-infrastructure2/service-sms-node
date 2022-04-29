let SmsProcess = require('../obj/src/container/SmsProcess').SmsProcess;

try {
    new SmsProcess().run(process.argv);
} catch (ex) {
    console.error(ex);
}
