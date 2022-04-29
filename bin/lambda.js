let SmsLambdaFunction = require('../obj/src/container/SmsLambdaFunction').SmsLambdaFunction;

module.exports = new SmsLambdaFunction().getHandler();