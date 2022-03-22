build image like so (WSL):

docker build -t cryptng/dotnet-nethereum-codegen:1.0.0 . &&
docker build -t cryptng/dotnet-nethereum-codegen:latest . &&
docker push cryptng/dotnet-nethereum-codegen:1.0.0 &&
docker push cryptng/dotnet-nethereum-codegen:latest

use image like so:

docker run -ti --rm -v ${HOME}:/root -v $(pwd):/app -w /app cryptng/dotnet-nethereum-codegen:latest dotnet 
