"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmsHttpServiceV1 = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_rpc_nodex_1 = require("pip-services3-rpc-nodex");
class SmsHttpServiceV1 extends pip_services3_rpc_nodex_1.CommandableHttpService {
    constructor() {
        super('v1/sms');
        this._dependencyResolver.put('controller', new pip_services3_commons_nodex_1.Descriptor('service-sms', 'controller', 'default', '*', '1.0'));
    }
}
exports.SmsHttpServiceV1 = SmsHttpServiceV1;
//# sourceMappingURL=SmsHttpServiceV1.js.map