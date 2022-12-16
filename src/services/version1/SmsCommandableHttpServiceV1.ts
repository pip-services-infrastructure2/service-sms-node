import { Descriptor } from 'pip-services3-commons-nodex';
import { CommandableHttpService } from 'pip-services3-rpc-nodex';

export class SmsCommandableHttpServiceV1 extends CommandableHttpService {
    public constructor() {
        super('v1/sms');
        this._dependencyResolver.put('controller', new Descriptor('service-sms', 'controller', 'default', '*', '1.0'));
    }
}