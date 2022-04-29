import { ProcessContainer } from 'pip-services3-container-nodex';
import { DefaultRpcFactory } from 'pip-services3-rpc-nodex';
import { DefaultSwaggerFactory } from 'pip-services3-swagger-nodex';

import { SmsServiceFactory } from '../build/SmsServiceFactory';

export class SmsProcess extends ProcessContainer {

    public constructor() {
        super("sms", "Sms delivery microservice");
        this._factories.add(new SmsServiceFactory);
        this._factories.add(new DefaultRpcFactory);
        this._factories.add(new DefaultSwaggerFactory);
    }

}
