#Cobb steals information from his targets by entering their dreams. 
#Saito offers to wipe clean Cobb's criminal history 
#as payment for performing an inception on his sick competitor's son.
FROM docker/compose:debian-1.29.2
RUN apt-get -y update && apt-get -y upgrade
RUN apt-get -y install git
WORKDIR /root/sources
RUN git clone https://github.com/crypt-ng/cryptng.git
#RUN docker-compose -f /root/sources/cryptng/tooling/docker-compose.yml up


