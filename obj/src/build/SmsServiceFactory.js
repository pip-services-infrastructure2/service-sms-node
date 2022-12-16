"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmsServiceFactory = void 0;
const pip_services3_components_nodex_1 = require("pip-services3-components-nodex");
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const SmsController_1 = require("../logic/SmsController");
const SmsCommandableHttpServiceV1_1 = require("../services/version1/SmsCommandableHttpServiceV1");
class SmsServiceFactory extends pip_services3_components_nodex_1.Factory {
    constructor() {
        super();
        this.registerAsType(SmsServiceFactory.ControllerDescriptor, SmsController_1.SmsController);
        this.registerAsType(SmsServiceFactory.HttpServiceDescriptor, SmsCommandableHttpServiceV1_1.SmsCommandableHttpServiceV1);
    }
}
exports.SmsServiceFactory = SmsServiceFactory;
SmsServiceFactory.Descriptor = new pip_services3_commons_nodex_1.Descriptor("service-sms", "factory", "default", "default", "1.0");
SmsServiceFactory.ControllerDescriptor = new pip_services3_commons_nodex_1.Descriptor("service-sms", "controller", "default", "*", "1.0");
SmsServiceFactory.HttpServiceDescriptor = new pip_services3_commons_nodex_1.Descriptor("service-sms", "service", "commandable-http", "*", "1.0");
//# sourceMappingURL=SmsServiceFactory.js.map