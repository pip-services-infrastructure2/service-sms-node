# Configuration Guide <br/> SMS Delivery Microservice

Sms delivery microservice configuration structure follows the 
[standard configuration](http://docs.pipservices.org/toolkit/recipes/config_file_syntax/) 
structure. 

* [controller](#controller)
* [service](#service)
  - [http](#service_http)
  - [seneca](#service_seneca)


## <a name="controller"></a> Controller

Controller has the following configuration properties:
- message: hashmap - Message default properties
  - from: string - sender address
  - cc: string - CC address
  - to: string - default recipient address
  - reply_to: string - Reply-To address
- connection: ConnectionParams - SMTP connection parameters
- credential: CredentialParams - SMTP credentials


Example:
```yaml
- descriptor: "service-sms:controller:default:default:1.0"
  message:
    from: 'somebody@somewhere.com'
    to: 'somebody@somewhere.com'
  credential:
    access_id: 'XXXXXXXXX'
    access_key: 'XXXXXXXXX'
```

## <a name="service"></a> Services

The **service** components (also called endpoints) expose external microservice API for the consumers. 
Each microservice can expose multiple APIs (HTTP/REST, Thrift or Seneca) and multiple versions of the same API type.
At least one service is required for the microservice to run successfully.

### <a name="service_http"></a> Http

HTTP/REST service has the following configuration properties:
- connection: object - HTTP transport configuration options
  - protocol: string - HTTP protocol - 'http' or 'https' (default is 'http')
  - host: string - IP address/hostname binding (default is '0.0.0.0')
  - port: number - HTTP port number

A detailed description of HTTP protocol version 1 can be found [here](HttpProtocolV1.md)

Example:
```yaml
- descriptor: "service-sms:service:commandable-http:default:1.0"
  connection:
    protocol: "http"
    host: "0.0.0.0"
    port: 3000
```

### <a name="service_seneca"></a> Seneca

Seneca service has the following configuration properties:
- connection: object - Seneca transport configuration options. See http://senecajs.org/api/ for details.
  - type: string - Seneca transport type 
  - host: string - IP address/hostname binding (default is '0.0.0.0')
  - port: number - Seneca port number

A detail description of Seneca protocol version 1 can be found [here](SenecaProtocolV1.md)

Example:
```yaml
- descriptor: "service-sms:service:seneca:default:1.0"
  connection:
    protocol: "http"
    host: "0.0.0.0"
    port: 3000
```

For more information on this section read 
[Pip.Services Configuration Guide](https://github.com/pip-services/pip-services3-container-nodex/doc/Configuration.md#deps)
