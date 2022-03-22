# cryptng
CryptNG Main project repository

## AVAILABLE LOCAL DOCKER SERVICES ##
TBD

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


## DEVELOP ON THE NEXT LEVEL ##

### GIT WITHOUT GIT ###
if you want to use git via container without actually installing it on your machine, follow these steps:

`nano ~/.profile`

paste following lines:

`function git () {(docker run -ti --rm -v ${HOME}:/root -v $(pwd):/git alpine/git "$@")}`

save, run 
`source ~/.profile`

use like so:

`git pull`

congratulations, you can now git via docker.

### TRUFFLE IS NOT JUST A FUNGHUS ###
if you want to use truffle via container without actually installing it on your machine, follow these steps:

`nano ~/.profile`

paste following lines:

`function truffle () {(docker run -ti --rm -v ${HOME}:/root -v $(pwd):/app cryptng/truffle-suite truffle "$@")}`

save, run 
`source ~/.profile`

use like so:

`truffle init`

congratulations, you can now use truffle via docker.

btw, i'd like some kudos for this one, it took me a hella lot of time to get this working, thaaaankkk you.


### TRUFFLE CAN BE SO MUCH MORE ###
if you want to use npm via container without actually installing it on your machine, follow these steps:

`nano ~/.profile`

paste following lines:

`function npm () {(docker run -ti --rm -v ${HOME}:/root -v $(pwd):/app cryptng/truffle-suite npm "$@")}`

save, run 
`source ~/.profile`

use like so:

`npm -v`

congratulations, you can now use npm via docker.

thanks to @cgreinke for pointing out that npm can be used like the truffle alias

### USE NODE FROM TRUFFLE ###
if you want to use node via container without actually installing it on your machine, follow these steps:

`nano ~/.profile`

paste following lines:

`function node () {(docker run -ti --rm -v ${HOME}:/root -v $(pwd):/app cryptng/truffle-suite node "$@")}`

save, run 
`source ~/.profile`

use like so:

`node -v`

congratulations, you can now use node via docker.



### Make it work in vscode ###

to use vscode console with our alias setups (truffle npm node etc)
call "source ~/.profile" from the vscode terminal