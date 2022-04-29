const assert = require('chai').assert;

import { ConfigParams } from 'pip-services3-commons-nodex';
import { SmsLambdaFunction } from '../../src/container/SmsLambdaFunction';

suite('SmsLambdaFunction', async ()=> {
    let lambda: SmsLambdaFunction;

    suiteSetup(async () => {
        let config = ConfigParams.fromTuples(
            'logger.descriptor', 'pip-services:logger:console:default:1.0',
            'controller.descriptor', 'service-sms:controller:default:default:1.0'
        );

        lambda = new SmsLambdaFunction();
        lambda.configure(config);
        await lambda.open(null);
    });
    
    suiteTeardown(async () => {
        await lambda.close(null);
    });
    
    test('Send message', async () => {
        await lambda.act(
            {
                role: 'sms',
                cmd: 'send_message',
                message: {
                    to: 'pipdevs@gmail.com',
                    text: 'This is a test message'
                }
            }
        );
    });

});