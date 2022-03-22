FROM debian:buster-slim
USER root
WORKDIR /app
RUN apt-get update && apt-get upgrade
RUN apt-get -y install npm git curl
RUN apt-get install -y software-properties-common 
RUN curl -sL https://deb.nodesource.com/setup_16.x | bash - 
RUN apt-get install -y nodejs