"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmsProcess = void 0;
const pip_services3_container_nodex_1 = require("pip-services3-container-nodex");
const pip_services3_rpc_nodex_1 = require("pip-services3-rpc-nodex");
const pip_services3_swagger_nodex_1 = require("pip-services3-swagger-nodex");
const SmsServiceFactory_1 = require("../build/SmsServiceFactory");
class SmsProcess extends pip_services3_container_nodex_1.ProcessContainer {
    constructor() {
        super("sms", "Sms delivery microservice");
        this._factories.add(new SmsServiceFactory_1.SmsServiceFactory);
        this._factories.add(new pip_services3_rpc_nodex_1.DefaultRpcFactory);
        this._factories.add(new pip_services3_swagger_nodex_1.DefaultSwaggerFactory);
    }
}
exports.SmsProcess = SmsProcess;
//# sourceMappingURL=SmsProcess.js.map