FROM arm32v7/golang:1.16
EXPOSE 3030
EXPOSE 8545

RUN apt-get update -y && apt-get upgrade -y



RUN go version


RUN go install github.com/ethereum/go-ethereum/cmd/geth@v1.9.21
ENTRYPOINT geth
