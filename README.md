# cryptng
CryptNG Main project repository


## AVAILABLE SERVICES AND PORTS ##

| Service | Address | Port(s) |
| ------------- | ------------- | ------------- |
| GANACHE TEST NODE | hub.cryptng.app | 8546 |
| GETH/ETH-GO FULL NODE | hub.cryptng.app | 8545 |


How to interact with these nodes:

Ideally, import the Postman collection that is included in the
"Sources/eth_jsonrpc_client_postman" folder.

Set up 2 Environments in Postman.

One "CryptNG_Test".
Set a variable "ENVIRONMENT"
Value: http://hub.cryptng.app:8546

One "CryptNG_Prod".
Set a variable "ENVIRONMENT"
Value: http://hub.cryptng.app:8545



