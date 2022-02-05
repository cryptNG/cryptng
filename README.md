# cryptng
CryptNG Main project repository

## AVAILABLE LOCAL DOCKER SERVICES ##
TBD

## OUR SETUP ##
Please be aware that we use the latest ranger on a bare-metal machine to host our docker infrastructure.
We also develop using WSL2 with docker inside WSL2.

Toolset: Np++, VsCode (+ extensions)
Nothing else, have fun!

## AVAILABLE DOCKER IMAGES ##

NOTE: we had to rebuild a lot of existing original docker images from scratch since their project holders often did not update their docker images.

You can find our Dockerfiles in their respective directories within 
`/source/dev_server` or `/source/dev_general/container_factory`

| IMAGE | URL | WHAT |
| ------------- | ------------- | ------------- |
| cryptng/ganache-cli | https://hub.docker.com/repository/docker/cryptng/ganache-cli | ganache-cli from 5th feb 22 |
| cryptng/truffle-suite | https://hub.docker.com/repository/docker/cryptng/truffle-suite | truffle-suite from 5th feb 22 |
| cryptng/blockscout | https://hub.docker.com/r/cryptng/blockscout | blockscout from 5th feb 22 |
| cryptng/debase-ginocunp | https://hub.docker.com/repository/docker/cryptng/debase-ginocunp | debian image with git, node 16x, curl, npm |
| cryptng/btc_esplora_explorer | https://hub.docker.com/repository/docker/cryptng/btc_esplora_explorer | btc blockchain explorer |
| eth_expedition_explorer | https://hub.docker.com/repository/docker/cryptng/eth_expedition_explorer | minimal eth blockchain explorer |


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


## HELP US OUT ##

We're pouring a lot of our free time, efforts and, coincidentally, also money into this project.
If you feel that we helped you out, made your life easier and are an enrichment to your life/worklife in any way,
please feel free to donate some tez or eth to our cause!

TEZ WALLET ADDRESS: `tz1aBUHyZDATRGrLEvYBgzXWMy1GyZeoZiW2`

ETH WALLET ADDRESS: `0xE18aaD87eEB259FF842FFc8136574Dd539Ab05e3`

Thank you for your support, the coffe and your love!


## DEVELOP ON THE NEXT LEVEL ##

### GIT CAN HAVE THE SMALLEST FINGERPRINT ###
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


### NPM SHALL NOT LITTER ###
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

### NODE (THIS IMAGE HAS SO MANY USES!) ###
if you want to use node via container without actually installing it on your machine, follow these steps:

`nano ~/.profile`

paste following lines:

`function node () {(docker run -ti --rm -v ${HOME}:/root -v $(pwd):/app cryptng/truffle-suite node "$@")}`

save, run 
`source ~/.profile`

use like so:

`node -v`

congratulations, you can now use node via docker.


### FULL EMBER.JS, NO COMMITMENTS ###


if you want to use ember via container without actually installing it on your machine, follow these steps:

`nano ~/.profile`

paste following lines:

`function ember () {(docker run -ti --rm -v ${HOME}:/root -v $(pwd):/app danlynn/ember-cli:4.1.1 ember "$@")}`

save, run 
`source ~/.profile`

use like so:

`node -v`

congratulations, you can now use ember via docker.

--> to serve ember with an extra command


`function embers () {(docker run -ti --rm -p 4200:4200 -p 7020:7020 -p 7357:7357  -v ${HOME}:/root -v $(pwd):/myapp danlynn/ember-cli:4.1.1 ember serve "$@")}`

### SPINNING UP YARN ###


if you want to use yarn via container without actually installing it on your machine, follow these steps:

`nano ~/.profile`

paste following lines:

`function yarn () {(docker run -ti --rm -v ${HOME}:/myapp -v $(pwd):/app danlynn/ember-cli:4.1.1 yarn "$@")}`

save, run 
`source ~/.profile`

use like so:

`node -v`

congratulations, you can now use yarn via docker.



### Make it work in vscode ###

to use vscode console with our alias setups (truffle npm node etc)
call "source ~/.profile" from the vscode terminal


### All-in-one copypaste job ###

just for you lazies out there.

`#-----------------mapped docker aliases----------------`

`#----------git---------`

`function git () {(docker run -ti --rm -v ${HOME}:/root -v $(pwd):/git alpine/git "$@")}`

`#----------truffle---------`

`function truffle () {(docker run -ti --rm -v ${HOME}:/root -v $(pwd):/app cryptng/truffle-suite truffle "$@")}`

`#----------npm---------`

`function npm () {(docker run -ti --rm -v ${HOME}:/root -v $(pwd):/app cryptng/truffle-suite npm "$@")}`

`#----------node---------`

`function node () {(docker run -ti --rm -v ${HOME}:/root -v $(pwd):/app cryptng/truffle-suite node "$@")}`

`#----------ember---------`

`function ember () {(docker run -ti --rm -v ${HOME}:/root -v $(pwd):/myapp danlynn/ember-cli:4.1.1 ember "$@")}`

`#----------yarn---------`

`function yarn () {(docker run -ti --rm -v ${HOME}:/root -v $(pwd):/myapp danlynn/ember-cli:4.1.1 yarn "$@")}`

`#----------ember-serve---------`
(calling command is just 'embers')

`function embers () {(docker run -ti --rm -p 4200:4200 -p 7020:7020 -p 7357:7357  -v ${HOME}:/root -v $(pwd):/myapp danlynn/ember-cli:4.1.1 ember serve "$@")}`

`#-----------------/mapped docker aliases----------------`



## FAQs ##

### Why did you build blockscout (docker-image) from scratch? ###
docker images of the latest alpine version (3.14>=) 
with elixir & erlang etc. are not compatible with the current version of rancherOS docker.
therefore we had to rebuild blockscout from scratch, this includes rebuilding the base image with erlang, elixir, phoenix.

furthermore, the latest available blockscout image to date was already very outdated and not usable
with our current up-to-date version of ganache-cli (which we also had to build because the original ganache image is old as heck)

### Why did you build ganache-cli (docker-image) from scratch? ###
the ganache-cli image version that is currently available (as of 5th of february 22) is about a year old
and incompatible with the current version of truffle suite that we are using (which is the latest as to time of writing)

### Why did you build truffle-suite (docker-image) from scratch? ###
an image only containing truffle-suite does not exist (5th feb 22).
the only way to get truffle suite was using ganache-cli.
the latest ganache-cli docker image is ~ 1 year old as i am writing this

### Why did you build esplora (docker-image) from scratch? ###
there was no version current enough (or at all) working with our up-to-date setup as i am writing this.
esplora was actually a mistake, we thought it was compatible with ETH Blockchains, which it wasnt.
But we put the effort into building it, so we are releasing the current version and discontinuing support
if nobody is interested in us taking this further.


### Why did you build expedition (docker-image) from scratch? ###
there was no version current enough (or at all) working with our up-to-date setup as i am writing this.
blockscout did not exist in a current version, we used this as an alternative to blockscout.
but expedition was missing lots of convenience features, so cg built the blockscout image.