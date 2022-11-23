#problem, setup step needs you to open up a webpage
#solution:
#open this webpage, enter your domainname in the correct place, copy the api key and pass ass access-key to here 
#https://domainconnect.ionos.de/async/v2/domainTemplates/providers/domainconnect.org?client_id=domainconnect.org&scope=dynamicdns-v2&domain=cryptng.com&host=testnet&IP=0.0.0.0&IPv4=0.0.0.0&IPv6=%3A%3A&redirect_uri=https%3A%2F%2Fdynamicdns.domainconnect.org%2Fddnscode
FROM library/python
ENV NAME_OF_THE_DOMAIN=testnet.cryptng.com
ENV ACCESS_KEY=0aaeb0df-158d-457d-9ebd-e7076fd09b5b
RUN apt-get -y update && apt-get upgrade
RUN apt-get -y install nano
RUN apt-get -y install cron
RUN crontab -e
RUN echo "*/1 * * * * /usr/bin/flock -n /tmp/ipupdate.lck /usr/local/bin/domain-connect-dyndns update --all --config /settings.txt > cron-result.txt" > /var/spool/cron/crontabs/root
RUN pip install domain-connect-dyndns
RUN domain-connect-dyndns setup --domain $NAME_OF_THE_DOMAIN
RUN domain-connect-dyndns update --all
RUN service cron start && tail -f /var/log/cron.log
WORKDIR /app

