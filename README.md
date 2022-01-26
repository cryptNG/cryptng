# cryptng
CryptNG Main project repository

## AVAILABLE DOCKER IMAGES ##

| IMAGE | URL | BASE |
| ------------- | ------------- | ------------- |
| cryptng/truffle-suite | https://hub.docker.com/repository/docker/cryptng/truffle-suite | DEBIAN BUSTER SLIM |

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


## SUPER COOL HACKS ##

### SUPERCHARGE GIT ###
if you want to use git via container without actually installing it on your machine, follow these steps:

nano ~/.profile

paste following lines:

function git () {
    (docker run -ti --rm -v ${HOME}:/root -v $(pwd):/git alpine/git "$@")
}

save, run 
source ~/.profile

congratulations, you can now git via docker.

### SUPERDEVELOP IN TRUFFLE ###
if you want to use truffle via container without actually installing it on your machine, follow these steps:

nano ~/.profile

paste following lines:

function truffle () {
(docker run -ti --rm -v ${HOME}:/root -v $(pwd):/app cryptng/truffle-suite truffle "$@")
}

save, run 
source ~/.profile

congratulations, you can now use truffle via docker.

btw, i'd like some kudos for this one, it took me a hella lot of time to get this working, thaaaankkk you.