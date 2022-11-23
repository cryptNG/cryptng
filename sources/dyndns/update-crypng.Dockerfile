FROM library/python
ENV NAME_OF_THE_DOMAIN=testnet.cryptng.com
ENV ACCESS_KEY=0aaeb0df-158d-457d-9ebd-e7076fd09b5b
RUN pip install domain-connect-dyndns
RUN domain-connect-dyndns setup --domain $NAME_OF_THE_DOMAIN
WORKDIR /app

