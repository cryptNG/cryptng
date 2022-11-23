#ARG VARIANT="debian"
#VALID VALUES FOR INIT ARE lowercase true for TRUE and any other non-empty string for false
#ARG INIT="false"
FROM debian:buster-slim
USER root
WORKDIR /app
RUN apt-get update && apt-get upgrade
RUN apt-get -y install curl
RUN apt-get -y install npm git
RUN curl -sL https://deb.nodesource.com/setup_16.x  | bash -
RUN apt-get -y install nodejs
RUN npm install -g truffle


#RUN if [[ "$INIT" = "true" ]]; then truffle init ; else echo "No initialization"; fi

#RUN curl -sL https://deb.nodesource.com/setup_17.x  | bash -
#RUN apt-get -y install nodejs
#RUN npm install
#RUN npm install -g truffle@5.4.30
