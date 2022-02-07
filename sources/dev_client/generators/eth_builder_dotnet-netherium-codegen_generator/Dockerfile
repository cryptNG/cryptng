FROM mcr.microsoft.com/dotnet/sdk:6.0
USER root
WORKDIR /app
RUN wget https://packages.microsoft.com/config/debian/11/packages-microsoft-prod.deb -O packages-microsoft-prod.deb
RUN dpkg -i packages-microsoft-prod.deb
RUN rm packages-microsoft-prod.deb
RUN apt-get update; \
  apt-get install -y apt-transport-https && \
  apt-get update && \
  apt-get install -y dotnet-sdk-2.1


RUN dotnet tool install -g Nethereum.Generator.Console