# Seneca Protocol (version 1) <br/> Sms Delivery Microservice

Sms delivery microservice implements a Seneca compatible API. 
Seneca port and protocol can be specified in the microservice [configuration](Configuration.md/#api_seneca). 

```javascript
var seneca = require('seneca')();

seneca.client({
    connection: {
        protocol: 'tcp', // Microservice seneca protocol
        host: 'localhost', // Microservice localhost
        port: 8805, // Microservice seneca port
    }
});
```

The microservice responds on the following requests:

```javascript
seneca.act(
    {
        role: 'sms',
        version: 1,
        cmd: ...cmd name....
        ... Arguments ...
    },
    function (err, result) {
        ...
    }
);
```
* [SmsMessageV1 class](#class1)
* [SmsRecipientV1 class](#class2)
* [cmd: 'send_message'](#operation1)
* [cmd: 'send_message_to_recipient'](#operation2)
* [cmd: 'send_message_to_recipients'](#operation3)

## Data types

### <a name="class1"></a> SmsMessageV1 class

Message object with sender and recipient addresses, subject and content

**Properties:**
    - to: string or [string] - one or several addresses of message recipient
    - from: string - (optional) sender address
    - text: string - (optional) message plain text body 

### <a name="class2"></a> SmsRecipientV1 class

Recipient properties. If some properties are not set, the service
tries to restore them from sms settings.

**Properties:**
- id: string - unique user id
- name: string - (optional) user full name
- phone: string - (optional) primary user sms
- language: string - (optional) user preferred language

## Operations

### <a name="operation1"></a> Cmd: 'send_message'

Sends sms message to specified address or addresses

**Arguments:** 
- message: SmsMessageV1 - message to be sent
- parameters: Object - (optional) template parameters

**Returns:**
- err: Error - occured error or null for success

### <a name="operation2"></a> Cmd: 'send\_message\_to_recipient'

Sends sms message to specified recipient

**Arguments:** 
- recipient: SmsRecipientV1 - recipient properties, including id
- message: SmsMessageV1 - message to be sent
- parameters: Object - (optional) template parameters

**Returns:**
- err: Error - occured error or null for success

### <a name="operation3"></a> Cmd: 'send\_messages\_to_recipients'

Sends sms message to multiple recipients

**Arguments:** 
- recipients: SmsRecipientV1[] - array of recipient properties, including id
- message: SmsMessageV1 - message to be sent
- parameters: Object - (optional) template parameters

**Returns:**
- err: Error - occured error or null for success

