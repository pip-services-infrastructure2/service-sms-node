"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmsCommandableHttpServiceV1 = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_rpc_nodex_1 = require("pip-services3-rpc-nodex");
class SmsCommandableHttpServiceV1 extends pip_services3_rpc_nodex_1.CommandableHttpService {
    constructor() {
        super('v1/sms');
        this._dependencyResolver.put('controller', new pip_services3_commons_nodex_1.Descriptor('service-sms', 'controller', 'default', '*', '1.0'));
    }
}
exports.SmsCommandableHttpServiceV1 = SmsCommandableHttpServiceV1;
//# sourceMappingURL=SmsCommandableHttpServiceV1.js.map