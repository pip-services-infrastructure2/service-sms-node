import { Factory } from 'pip-services3-components-nodex';
import { Descriptor } from 'pip-services3-commons-nodex';

import { SmsController } from '../logic/SmsController';
import { SmsCommandableHttpServiceV1 } from '../services/version1/SmsCommandableHttpServiceV1'; 

export class SmsServiceFactory extends Factory {
	public static Descriptor = new Descriptor("service-sms", "factory", "default", "default", "1.0");
	public static ControllerDescriptor = new Descriptor("service-sms", "controller", "default", "*", "1.0");
	public static HttpServiceDescriptor = new Descriptor("service-sms", "service", "commandable-http", "*", "1.0");
	
	constructor() {
		super();
		this.registerAsType(SmsServiceFactory.ControllerDescriptor, SmsController);
		this.registerAsType(SmsServiceFactory.HttpServiceDescriptor, SmsCommandableHttpServiceV1);
	}
	
}
