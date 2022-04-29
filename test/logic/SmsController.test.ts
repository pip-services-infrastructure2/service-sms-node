const assert = require('chai').assert;

import { ConfigParams } from 'pip-services3-commons-nodex';

import { SmsMessageV1 } from '../../src/data/version1/SmsMessageV1';
import { SmsRecipientV1 } from '../../src/data/version1/SmsRecipientV1';
import { SmsController } from '../../src/logic/SmsController';

suite('SmsController', ()=> {
    let controller: SmsController;

    let awsAccessId = process.env['AWS_ACCESS_ID'];
    let awsAccessKey = process.env['AWS_ACCESS_KEY'];

    let messageFrom = process.env['MESSAGE_FROM'] || "PipDevs";
    let messageTo = process.env['MESSAGE_TO'];

    if (awsAccessId == null || messageTo == null)
        return;

    suiteSetup(async () => {
        controller = new SmsController();

        let config = ConfigParams.fromTuples(
            "message.from", messageFrom,

            "credential.access_id", awsAccessId,
            "credential.access_key", awsAccessKey
        );
        controller.configure(config);

        await controller.open(null);
    });

    suiteTeardown(async () => {
        await controller.close(null);
    });

    test('Send Message to Address', async () => {
        let message =  <SmsMessageV1> {
            to: messageTo,
            text: '{{text}}'
        };

        let parameters = ConfigParams.fromTuples(
            'text', 'This is just a test'
        );

        await controller.sendMessage(
            null, message, parameters,
        );
    });

    test('Send Message to Recipient', async () => {
        let message =  <SmsMessageV1> {
            text: 'This is just a test'
        };

        let recipient = <SmsRecipientV1> {
            id: '1',
            phone: messageTo,
            name: 'Test Recipient'
        };

        await controller.sendMessageToRecipient(
            null, recipient, message, null,
        );
    });
    
});