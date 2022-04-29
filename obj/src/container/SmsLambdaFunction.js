"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = exports.SmsLambdaFunction = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_aws_nodex_1 = require("pip-services3-aws-nodex");
const SmsServiceFactory_1 = require("../build/SmsServiceFactory");
class SmsLambdaFunction extends pip_services3_aws_nodex_1.CommandableLambdaFunction {
    constructor() {
        super("sms", "Sms delivery function");
        this._dependencyResolver.put('controller', new pip_services3_commons_nodex_1.Descriptor('service-sms', 'controller', 'default', '*', '*'));
        this._factories.add(new SmsServiceFactory_1.SmsServiceFactory());
    }
}
exports.SmsLambdaFunction = SmsLambdaFunction;
exports.handler = new SmsLambdaFunction().getHandler();
//# sourceMappingURL=SmsLambdaFunction.js.map