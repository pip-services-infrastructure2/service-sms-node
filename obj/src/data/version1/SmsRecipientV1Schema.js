"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmsRecipientV1Schema = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
class SmsRecipientV1Schema extends pip_services3_commons_nodex_1.ObjectSchema {
    constructor() {
        super();
        this.withRequiredProperty('id', pip_services3_commons_nodex_2.TypeCode.String);
        this.withOptionalProperty('name', pip_services3_commons_nodex_2.TypeCode.String);
        this.withOptionalProperty('phone', pip_services3_commons_nodex_2.TypeCode.String);
        this.withOptionalProperty('language', pip_services3_commons_nodex_2.TypeCode.String);
    }
}
exports.SmsRecipientV1Schema = SmsRecipientV1Schema;
//# sourceMappingURL=SmsRecipientV1Schema.js.map