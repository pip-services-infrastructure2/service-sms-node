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
exports.SmsController = void 0;
const mustache = require('mustache');
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_components_nodex_1 = require("pip-services3-components-nodex");
const pip_services3_components_nodex_2 = require("pip-services3-components-nodex");
const SmsCommandSet_1 = require("./SmsCommandSet");
const pip_services3_expressions_nodex_1 = require("pip-services3-expressions-nodex");
class SmsController {
    constructor() {
        this._credentialResolver = new pip_services3_components_nodex_1.CredentialResolver();
        this._logger = new pip_services3_components_nodex_2.CompositeLogger();
        this._opened = false;
        this._parameters = new pip_services3_commons_nodex_1.ConfigParams();
        this._disabled = false;
        this._connectTimeout = 30000;
        this._maxPrice = 0.5;
        //private _smsType: string = 'Promotional';
        this._smsType = 'Transactional';
    }
    configure(config) {
        this._config = config.setDefaults(SmsController._defaultConfig);
        this._messageFrom = config.getAsStringWithDefault("message.from", this._messageFrom);
        this._parameters = config.getSection("parameters");
        this._connectTimeout = config.getAsIntegerWithDefault("options.connect_timeout", this._connectTimeout);
        this._maxPrice = config.getAsFloatWithDefault("options.max_price", this._maxPrice);
        this._smsType = config.getAsStringWithDefault("options.sms_type", this._smsType);
        this._logger.configure(config);
        this._credentialResolver.configure(config);
    }
    setReferences(references) {
        this._logger.setReferences(references);
        this._credentialResolver.setReferences(references);
    }
    getCommandSet() {
        if (this._commandSet == null)
            this._commandSet = new SmsCommandSet_1.SmsCommandSet(this);
        return this._commandSet;
    }
    isOpen() {
        return this._opened;
    }
    open(correlationId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._opened)
                return null;
            this._credential = yield this._credentialResolver.lookup(correlationId);
            if (this._credential && this._credential.getAccessId() == null)
                this._credential = null;
            // This is a hack to simplify testing
            // Todo: Redo this later
            if (this._credential) {
                let aws = require('aws-sdk');
                aws.config.update({
                    accessKeyId: this._credential.getAccessId(),
                    secretAccessKey: this._credential.getAccessKey(),
                    region: 'us-east-1'
                });
                aws.config.httpOptions = {
                    timeout: this._connectTimeout
                };
                this._sns = new aws.SNS();
                this._opened = true;
                this._logger.debug(correlationId, "Connected to AWS SNS");
            }
        });
    }
    close(correlationId) {
        return __awaiter(this, void 0, void 0, function* () {
            this._opened = null;
        });
    }
    getLanguageTemplate(value, language = 'en') {
        if (value == null)
            return value;
        if (typeof value != 'object')
            return value;
        // Set default language
        language = language || "en";
        // Get template for specified language
        let template = value[language];
        // Get template for default language
        if (template == null)
            template = value["en"];
        return "" + template;
    }
    renderTemplate(value, parameters, language = 'en') {
        let template = this.getLanguageTemplate(value, language);
        let mustache = new pip_services3_expressions_nodex_1.MustacheTemplate(template);
        return template ? mustache.evaluateWithVariables(parameters) : null;
    }
    sendMessage(correlationId, message, parameters) {
        return __awaiter(this, void 0, void 0, function* () {
            // Skip processing if sms is disabled or message has no destination
            if (!this._opened || message.to == null) {
                return null;
            }
            parameters = this._parameters.override(parameters);
            let text = this.renderTemplate(message.text, parameters);
            let params = {
                PhoneNumber: message.to,
                Message: text,
                MessageStructure: 'String',
                MessageAttributes: {
                    'AWS.SNS.SMS.SenderID': {
                        StringValue: message.from || this._messageFrom,
                        DataType: 'String'
                    },
                    'AWS.SNS.SMS.MaxPrice': {
                        StringValue: this._maxPrice.toString(),
                        DataType: 'Number'
                    },
                    'AWS.SNS.SMS.SMSType': {
                        StringValue: this._smsType,
                        DataType: 'String'
                    }
                }
            };
            yield this._sns.publish(params);
        });
    }
    makeRecipientParameters(recipient, parameters) {
        parameters = this._parameters.override(parameters);
        parameters.append(recipient);
        return parameters;
    }
    sendMessageToRecipient(correlationId, recipient, message, parameters) {
        return __awaiter(this, void 0, void 0, function* () {
            // Skip processing if sms is disabled
            if (!this._opened || recipient == null || recipient.phone == null) {
                return null;
            }
            let recParams = this.makeRecipientParameters(recipient, parameters);
            let recLanguage = recipient.language;
            let text = this.renderTemplate(message.text, recParams, recLanguage);
            let params = {
                PhoneNumber: recipient.phone,
                Message: text,
                MessageStructure: 'String',
                MessageAttributes: {
                    'AWS.SNS.SMS.SenderID': {
                        StringValue: message.from || this._messageFrom,
                        DataType: 'String'
                    },
                    'AWS.SNS.SMS.MaxPrice': {
                        StringValue: this._maxPrice.toString(),
                        DataType: 'Number'
                    },
                    'AWS.SNS.SMS.SMSType': {
                        StringValue: this._smsType,
                        DataType: 'String'
                    }
                }
            };
            yield this._sns.publish(params);
        });
    }
    sendMessageToRecipients(correlationId, recipients, message, parameters) {
        return __awaiter(this, void 0, void 0, function* () {
            // Skip processing if sms is disabled
            if (!this._opened || recipients == null || recipients.length == 0) {
                return null;
            }
            // Send sms separately to each user
            let tasks = [];
            for (let recipient of recipients) {
                tasks.push(this.sendMessageToRecipient(correlationId, recipient, message, parameters));
            }
            yield Promise.all(tasks);
        });
    }
}
exports.SmsController = SmsController;
SmsController._defaultConfig = pip_services3_commons_nodex_1.ConfigParams.fromTuples('message.from', null, 'options.connect_timeout', 30000, 'options.max_price', 0.5, 'options.sms_type', 'Promotional');
//# sourceMappingURL=SmsController.js.map