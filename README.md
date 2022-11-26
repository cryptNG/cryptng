

*IMPORTANT NOTE:
To use any of the blockchain-enabled products, during the testing-phase you will need to set up our private cryptNG blockchain in metamask.
we don't have a specific tutorial for that, but we have a Medium Article that explains how to set up your wallet for one of our products (metaTrail).
You can just follow that tutorial without using metaTrail, and you're ready to go and use any of our blockchain products that are currently online.
Please find the article here:

https://cryptng.medium.com/how-to-get-started-with-metatrail-earlybird-b37a287ebb8e

We will soon be updating all documentation to make things easier for you.
Sorry for the inconvenience!

Btw, you might want to check out our subreddit!

https://www.reddit.com/r/cryptNg/

and/or our introduction:

https://www.reddit.com/r/cryptNg/comments/z53fcq/whats_cryptng_a_short_introduction/


##########

*NOTE: THE CONTENTS OF THIS FILE ARE SUBJECT TO CHANGE AND WILL LIKELY BE COMPLETELY REWRITTEN IN THE NEAR FUTURE.*

#


> “Bring something incomprehensible into the world!”  
― Gilles Deleuze, [A Thousand Plateaus: Capitalism and Schizophrenia]

# enter: CryptNG

*crypt..n'**what**?*

*Crypt***NG** stands for "*Crypt*o **N**ext **G**eneration".

We are a group of developers originating from germany, committing to weaving a net of innovation and contribution into the fabric of open-source development .




# integrating payment & trustless computing for everyone!

This particular project is our first collaboration, in this, we aim to create a platform to integrate trustless-computing and payment into any kind of software `&/||` `(and/or)` online service.

We developed a smart contract that will manage service authorizations, payment and usage-management.
The contract is a base for cloud-computing services that can be easily deployed and managed without needing to implement complex extensions to support blockchain interactions.

# web3 = life 2.0

In the future, we aim to provide widely usable services for web2 & web3 applications, all openly sourced, 100% fairly traded and community driven.

Let us take you by the hand and show you how easy, intuitive and loveable blockchain technology can be,
how it can enable us to solve old-world problems with new-world ideas.

We don't just want to enhance business,
we want to enhance life, comfort, usability and digital integration for everyone.

Our future projects are targeting YOUR personal life directly, together, we will shift the public conciousness of web3 to new heights, new levels, enable new possibilities.

Talking about personal improvements, we don't mean the "metaverses" or virtual/augmented realities of our times.
We're talking actual benefits, for you, me, us, in the flesh.

It just needs commitment, and open-sourced love.
Trust us, let's become trustless.



## the essence of data: extract, transform, load. ##
This is the first project that uses our smart-contract trustless-computing platform to provide online-services.
The PdfDistiller service retrieves XML & XSL files, uses the XSL Files to transform the XML files into the desired shaped.
We use technologies that enable us to generate QR Codes, Graphs, Barcodes and Datamatrixes, enabling you to employ our service to enable complex business reporting, product description and data management.

TBD: Process description here


## OUR SETUP ##
Please be aware that we use the latest ranger on a bare-metal machine to host our docker infrastructure.
We also develop using WSL2 with docker inside WSL2.

Toolset: Np++, VsCode (+ extensions)
Nothing else, have fun!

TBD: folder-structure and services within the solution here

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
| cryptng/dotnet-nethereum-codegen | https://hub.docker.com/repository/docker/cryptng/dotnet-nethereum-codegen | dotnet6 base image with nethereum codegen from 6th feb 22 |
| cryptng/adojdk11mvn | https://hub.docker.com/repository/docker/cryptng/adojdk11mvn | adoptopenjdk11, maven |
| cryptng/pdfdistiller | https://hub.docker.com/repository/docker/cryptng/pdfdistiller | java based pdf generation |


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

if you want to use truffle via container without actually installing it on your machine, follow these steps:

`nano ~/.profile`

paste following lines:

`function truffle () {(docker run -ti --rm -v ${HOME}:/root -v $(pwd):/app -p 9545:9545 cryptng/truffle-suite truffle "$@" && sudo chown -R 1000:1000 *))}`

save, run 
`source ~/.profile`

use like so:

`truffle init`

congratulations, you can now use truffle via docker.

btw, i'd like some kudos for this one, it took me a hella lot of time to get this working, thaaaankkk you.


to serve truffle independently:

`function truffled () {(docker run -ti --rm -v $(pwd):/app -p 9545:9545 cryptng/truffle-suite truffle develop "$@" && sudo chown -R 1000:1000 *)}`

### NPM SHALL NOT LITTER ###
if you want to use npm via container without actually installing it on your machine, follow these steps:

`nano ~/.profile`

paste following lines:

`function npm () {(docker run -ti --rm -v ${HOME}:/root -v $(pwd):/app cryptng/truffle-suite npm "$@" && sudo chown -R 1000:1000 *)}`

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

`function node () {(docker run -ti --rm -v ${HOME}:/root -v $(pwd):/app cryptng/truffle-suite node "$@" && sudo chown -R 1000:1000 *))}`

save, run 
`source ~/.profile`

use like so:

`node -v`

congratulations, you can now use node via docker.


### FULL EMBER.JS, NO COMMITMENTS ###


if you want to use ember via container without actually installing it on your machine, follow these steps:

`nano ~/.profile`

paste following lines:

`function ember () {(docker run -ti --rm -v ${HOME}:/root -v $(pwd):/app danlynn/ember-cli:4.1.1 ember "$@" && sudo chown -R 1000:1000 *))}`

save, run 
`source ~/.profile`

use like so:

`ember -v`

congratulations, you can now use ember via docker.

--> to serve ember with an extra command


`function embers () {(docker run -ti --rm -p 4200:4200 -p 7020:7020 -p 7357:7357  -v ${HOME}:/root -v $(pwd):/myapp danlynn/ember-cli:4.1.1 ember serve "$@" && sudo chown -R 1000:1000 *))}`


use like so:

`embers`

### SPINNING UP YARN ###


if you want to use yarn via container without actually installing it on your machine, follow these steps:

`nano ~/.profile`

paste following lines:

`function yarn () {(docker run -ti --rm -v ${HOME}:/myapp -v $(pwd):/app danlynn/ember-cli:4.1.1 yarn "$@" && sudo chown -R 1000:1000 *))}`

save, run 
`source ~/.profile`

use like so:

`yarn -v`

congratulations, you can now use yarn via docker.


### CROSS-PLATFORM C# ###


if you want to use yarn via container without actually installing it on your machine, follow these steps:

`nano ~/.profile`

paste following lines:

`function dotnet () {(docker run -ti --rm -v ${HOME}:/root -v $(pwd):/app -w /app cryptng/dotnet-nethereum-codegen:latest dotnet "$@" && sudo chown -R 1000:1000 *))}`

save, run 
`source ~/.profile`

use like so:

`dotnet --version`

congratulations, you can now use dotnet on linux via docker.



### NETHEREUM CODEGEN ###



if you want to use nethereum code generator console via container without actually installing it on your machine, follow these steps:

`nano ~/.profile`

paste following lines:

`function ngc () {(docker run -ti --rm -v $(pwd):/app -w /app cryptng/dotnet-nethereum-codegen:latest /root/.dotnet/tools/Nethereum.Generator.Console "$@" && sudo chown -R 1000:1000 *))}`

save, run 
`source ~/.profile`

use like so:

`ngc --version`

congratulations, you can now use nethereum code generator console on linux via docker.




### Make it work in vscode ###

to use vscode console with our alias setups (truffle npm node etc)
call "source ~/.profile" from the vscode terminal



## FAQs ##


### Why are you not installing stuff on your machines locally? Why aliases? ###
We work on multiple projects at once, some of them need different versions of packages and tools.
We would rather like to not see any cross-pollution between packages and tools that we use.
Since docker packs anything a tool needs neatly together and also manages dependencies independently,
it's the cleanest way to run stuff without creating lots of rubbish to clean up later.

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
