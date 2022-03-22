This contains the builder for the blockscout docker image
blockscout is a locally hosted, complex blockchain explorer with a lot of current features.



image name:
cryptng/eth_blockscout_explorer

the compose file is included to demonstrate and test usage

############## WHY DOES THIS EXIST? ######################
docker images of the latest alpine version (3.14>=) 
with elixir & erlang etc. are not compatible with the current version of rancherOS docker.
therefore we had to rebuild blockscout from scratch, this includes rebuilding the base image with erlang, elixir, phoenix.

furthermore, the latest available blockscout image to date was already very outdated and not usable
with our current up-to-date version of ganache-cli (which we also had to build because the original ganache image is old as heck)