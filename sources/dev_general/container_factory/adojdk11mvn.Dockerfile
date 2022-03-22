#USING MAVEN LICENSED UNDER APACHE 2.0
FROM adoptopenjdk/openjdk11
RUN apt-get update && apt-get upgrade
RUN apt-get install -y maven
WORKDIR /app

