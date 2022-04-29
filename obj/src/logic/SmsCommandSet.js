"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmsCommandSet = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_3 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_4 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_5 = require("pip-services3-commons-nodex");
const SmsMessageV1Schema_1 = require("../data/version1/SmsMessageV1Schema");
const SmsRecipientV1Schema_1 = require("../data/version1/SmsRecipientV1Schema");
class SmsCommandSet extends pip_services3_commons_nodex_1.CommandSet {
    constructor(logic) {
        super();
        this._logic = logic;
        this.addCommand(this.makeSendMessageCommand());
        this.addCommand(this.makeSendMessageToRecipientCommand());
        this.addCommand(this.makeSendMessageToRecipientsCommand());
    }
    makeSendMessageCommand() {
        return new pip_services3_commons_nodex_2.Command("send_message", new pip_services3_commons_nodex_3.ObjectSchema(true)
            .withRequiredProperty('message', new SmsMessageV1Schema_1.SmsMessageV1Schema())
            .withOptionalProperty('parameters', pip_services3_commons_nodex_5.TypeCode.Map), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let message = args.get("message");
            let parameters = args.get("parameters");
            yield this._logic.sendMessage(correlationId, message, parameters);
        }));
    }
    makeSendMessageToRecipientCommand() {
        return new pip_services3_commons_nodex_2.Command("send_message_to_recipient", new pip_services3_commons_nodex_3.ObjectSchema(true)
            .withRequiredProperty('message', new SmsMessageV1Schema_1.SmsMessageV1Schema())
            .withRequiredProperty('recipient', new SmsRecipientV1Schema_1.SmsRecipientV1Schema())
            .withOptionalProperty('parameters', pip_services3_commons_nodex_5.TypeCode.Map), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let message = args.get("message");
            let recipient = args.get("recipient");
            let parameters = args.get("parameters");
            yield this._logic.sendMessageToRecipient(correlationId, recipient, message, parameters);
        }));
    }
    makeSendMessageToRecipientsCommand() {
        return new pip_services3_commons_nodex_2.Command("send_message_to_recipients", new pip_services3_commons_nodex_3.ObjectSchema(true)
            .withRequiredProperty('message', new SmsMessageV1Schema_1.SmsMessageV1Schema())
            .withRequiredProperty('recipients', new pip_services3_commons_nodex_4.ArraySchema(new SmsRecipientV1Schema_1.SmsRecipientV1Schema()))
            .withOptionalProperty('parameters', pip_services3_commons_nodex_5.TypeCode.Map), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let message = args.get("message");
            let recipients = args.get("recipients");
            let parameters = args.get("parameters");
            yield this._logic.sendMessageToRecipients(correlationId, recipients, message, parameters);
        }));
    }
}
exports.SmsCommandSet = SmsCommandSet;
//# sourceMappingURL=SmsCommandSet.js.map