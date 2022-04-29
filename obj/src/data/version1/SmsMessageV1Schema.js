"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmsMessageV1Schema = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
class SmsMessageV1Schema extends pip_services3_commons_nodex_1.ObjectSchema {
    constructor() {
        super();
        this.withOptionalProperty('from', pip_services3_commons_nodex_2.TypeCode.String);
        this.withOptionalProperty('to', pip_services3_commons_nodex_2.TypeCode.String);
        this.withOptionalProperty('text', null);
    }
}
exports.SmsMessageV1Schema = SmsMessageV1Schema;
//# sourceMappingURL=SmsMessageV1Schema.js.map