import { Factory } from 'pip-services3-components-nodex';
import { Descriptor } from 'pip-services3-commons-nodex';

import { SmsController } from '../logic/SmsController';
import { SmsHttpServiceV1 } from '../services/version1/SmsHttpServiceV1'; 

export class SmsServiceFactory extends Factory {
	public static Descriptor = new Descriptor("service-sms", "factory", "default", "default", "1.0");
	public static ControllerDescriptor = new Descriptor("service-sms", "controller", "default", "*", "1.0");
	public static HttpServiceDescriptor = new Descriptor("service-sms", "service", "http", "*", "1.0");
	
	constructor() {
		super();
		this.registerAsType(SmsServiceFactory.ControllerDescriptor, SmsController);
		this.registerAsType(SmsServiceFactory.HttpServiceDescriptor, SmsHttpServiceV1);
	}
	
}
