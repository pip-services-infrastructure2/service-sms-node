import { CommandSet } from 'pip-services3-commons-nodex';
import { ISmsController } from './ISmsController';
export declare class SmsCommandSet extends CommandSet {
    private _logic;
    constructor(logic: ISmsController);
    private makeSendMessageCommand;
    private makeSendMessageToRecipientCommand;
    private makeSendMessageToRecipientsCommand;
}
