What are the generators?

The generators are folders that contain the dockerfiles which you can use to build the images.
Furthermore, there are docker-compose files to demonstrate how to use the built docker images.
You can also just edit the dockerfile and use compose, not pushing the images at all.

Note that some Dockerfile builds take lots of time and resources, even on high-end machines they might not be built to the end.
We used a server that has a lot of cores and power to build e.g. the blockscout image.
(my i7, rtx2060 laptop wasn't able to handle the build)