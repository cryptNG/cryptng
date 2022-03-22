FROM debian:buster-slim
USER root
WORKDIR /app
RUN apt-get update && apt-get upgrade
RUN apt-get -y install npm git curl
RUN apt-get install -y software-properties-common 
RUN curl -sL https://deb.nodesource.com/setup_16.x | bash - 
RUN apt-get install -y nodejs
EXPOSE 5000
EXPOSE 5001
RUN git clone https://github.com/Blockstream/esplora
RUN cd esplora
WORKDIR /app/esplora
RUN npm install
RUN export API_URL=https://blockstream.info/api/ # default example
#RUN npm run dev-server
