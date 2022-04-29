const restify = require('restify');
const assert = require('chai').assert;

import { ConfigParams } from 'pip-services3-commons-nodex';
import { Descriptor } from 'pip-services3-commons-nodex';
import { References } from 'pip-services3-commons-nodex';

import { SmsController } from '../../../src/logic/SmsController';
import { SmsHttpServiceV1 } from '../../../src/services/version1/SmsHttpServiceV1';

let httpConfig = ConfigParams.fromTuples(
    "connection.protocol", "http",
    "connection.host", "localhost",
    "connection.port", 3000
);

suite('SmsHttpServiceV1', ()=> {
    let service: SmsHttpServiceV1;

    let rest: any;

    suiteSetup(async () => {
        let controller = new SmsController();
        controller.configure(new ConfigParams());

        service = new SmsHttpServiceV1();
        service.configure(httpConfig);

        let references: References = References.fromTuples(
            new Descriptor('service-sms', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('service-sms', 'service', 'http', 'default', '1.0'), service
        );
        controller.setReferences(references);
        service.setReferences(references);

        await service.open(null);
    });
    
    suiteTeardown(async () => {
        await service.close(null);
    });

    setup(() => {
        let url = 'http://localhost:3000';
        rest = restify.createJsonClient({ url: url, version: '*' });
    });

    test('Send message', async () => {
        await new Promise<any>((resolve, reject) => { 
            rest.post('/v1/sms/send_message',
                {
                    message: {
                        to: '+15202353563',
                        text: 'This is a test message'
                    }
                },
                (err, req, res, result) => {
                    if (err == null) resolve(result)
                    else reject(err);
                }
            );
        });
    });
    
});