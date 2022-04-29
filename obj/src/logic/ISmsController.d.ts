import { ConfigParams } from 'pip-services3-commons-nodex';
import { SmsMessageV1 } from '../data/version1/SmsMessageV1';
import { SmsRecipientV1 } from '../data/version1/SmsRecipientV1';
export interface ISmsController {
    sendMessage(correlationId: string, message: SmsMessageV1, parameters: ConfigParams): Promise<void>;
    sendMessageToRecipient(correlationId: string, recipient: SmsRecipientV1, message: SmsMessageV1, parameters: ConfigParams): Promise<void>;
    sendMessageToRecipients(correlationId: string, recipients: SmsRecipientV1[], message: SmsMessageV1, parameters: ConfigParams): Promise<void>;
}
