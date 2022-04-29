const mustache = require('mustache');

import { ConfigParams } from 'pip-services3-commons-nodex';
import { IConfigurable } from 'pip-services3-commons-nodex';
import { IReferences } from 'pip-services3-commons-nodex';

import { IReferenceable } from 'pip-services3-commons-nodex';
import { CredentialParams } from 'pip-services3-components-nodex';
import { CredentialResolver } from 'pip-services3-components-nodex';
import { ICommandable } from 'pip-services3-commons-nodex';
import { CommandSet } from 'pip-services3-commons-nodex';

import { IOpenable } from 'pip-services3-commons-nodex';
import { CompositeLogger } from 'pip-services3-components-nodex';

import { SmsMessageV1 } from '../data/version1/SmsMessageV1';
import { SmsRecipientV1 } from '../data/version1/SmsRecipientV1';
import { ISmsController } from './ISmsController';
import { SmsCommandSet } from './SmsCommandSet';
import { MustacheTemplate } from 'pip-services3-expressions-nodex';

export class SmsController implements IConfigurable, IReferenceable, ICommandable, IOpenable, ISmsController {
    private static _defaultConfig: ConfigParams = ConfigParams.fromTuples(
        'message.from', null,

        'options.connect_timeout', 30000,
        'options.max_price', 0.5,
        'options.sms_type', 'Promotional'
    );

    private _credentialResolver: CredentialResolver = new CredentialResolver();
    private _logger: CompositeLogger = new CompositeLogger();

    private _sns: any;
    private _opened: boolean = false;
    private _credential: CredentialParams;
    
    private _config: ConfigParams;
    private _messageFrom: string;
    private _parameters: ConfigParams = new ConfigParams();
    
    private _disabled: boolean = false;
    private _connectTimeout: number = 30000;
    private _maxPrice: number = 0.5;
    //private _smsType: string = 'Promotional';
    private _smsType: string = 'Transactional';

    private _commandSet: SmsCommandSet;

    public configure(config: ConfigParams): void {
        this._config = config.setDefaults(SmsController._defaultConfig);

        this._messageFrom = config.getAsStringWithDefault("message.from", this._messageFrom);
        this._parameters = config.getSection("parameters");

        this._connectTimeout = config.getAsIntegerWithDefault("options.connect_timeout", this._connectTimeout);
        this._maxPrice = config.getAsFloatWithDefault("options.max_price", this._maxPrice);
        this._smsType = config.getAsStringWithDefault("options.sms_type", this._smsType);
        
        this._logger.configure(config);
        this._credentialResolver.configure(config);
    }

    public setReferences(references: IReferences): void {
        this._logger.setReferences(references);
        this._credentialResolver.setReferences(references);
    }

    public getCommandSet(): CommandSet {
        if (this._commandSet == null)
            this._commandSet = new SmsCommandSet(this);
        return this._commandSet;
    }

    public isOpen(): boolean {
        return this._opened;
    }

    public async open(correlationId: string): Promise<void> {
        if (this._opened) return null;

        this._credential = await this._credentialResolver.lookup(correlationId);

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
    }

    public async close(correlationId: string): Promise<void> {
        this._opened = null;
    }
    
    private getLanguageTemplate(value: any, language: string = 'en') {
        if (value == null) return value;

        if (typeof value != 'object') return value;

        // Set default language
        language = language || "en";

        // Get template for specified language
        let template = value[language];

        // Get template for default language
        if (template == null)
            template = value["en"];
        
        return "" + template;
    }

    private renderTemplate(value: any, parameters: ConfigParams, language: string = 'en'): string {
        let template = this.getLanguageTemplate(value, language);
        let mustache = new MustacheTemplate(template);
        return template ? mustache.evaluateWithVariables(parameters) : null;
    }

    public async sendMessage(correlationId: string, message: SmsMessageV1, parameters: ConfigParams): Promise<void> {

        // Skip processing if sms is disabled or message has no destination
        if (!this._opened || message.to == null) {
            return null;
        }

        parameters = this._parameters.override(parameters);

        let text = this.renderTemplate(message.text, parameters);

        let params: any = {
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

        await this._sns.publish(params);
    }

    private makeRecipientParameters(recipient: SmsRecipientV1, parameters: any): ConfigParams {
        parameters = this._parameters.override(parameters);
        parameters.append(recipient);
        return parameters;
    }

    public async sendMessageToRecipient(correlationId: string, recipient: SmsRecipientV1,
        message: SmsMessageV1, parameters: ConfigParams): Promise<void> {

        // Skip processing if sms is disabled
        if (!this._opened || recipient == null || recipient.phone == null) {
            return null;
        }

        let recParams = this.makeRecipientParameters(recipient, parameters);
        let recLanguage = recipient.language;
        let text = this.renderTemplate(message.text, recParams, recLanguage);

        let params: any = {
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

        await this._sns.publish(params);
    }

    public async sendMessageToRecipients(correlationId: string, recipients: SmsRecipientV1[],
        message: SmsMessageV1, parameters: ConfigParams): Promise<void> {

        // Skip processing if sms is disabled
        if (!this._opened || recipients == null || recipients.length == 0) {
            return null;
        }

        // Send sms separately to each user
        let tasks = [];

        for (let recipient of recipients) {
            tasks.push(
                this.sendMessageToRecipient(correlationId, recipient, message, parameters)
            );
        }
        
        await Promise.all(tasks);
    }

}
