import { Descriptor } from 'pip-services3-commons-nodex';
import { CommandableLambdaFunction } from 'pip-services3-aws-nodex';
import { SmsServiceFactory } from '../build/SmsServiceFactory';

export class SmsLambdaFunction extends CommandableLambdaFunction {
    public constructor() {
        super("sms", "Sms delivery function");
        this._dependencyResolver.put('controller', new Descriptor('service-sms', 'controller', 'default', '*', '*'));
        this._factories.add(new SmsServiceFactory());
    }
}

export const handler = new SmsLambdaFunction().getHandler();