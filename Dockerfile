FROM node:12.13.1-alpine3.9

LABEL maintainer="Pablo Sousa <pablosousa.ads@gmail.com>"

RUN apk add --no-cache openssl bash

WORKDIR /var/www
RUN rm -rf /var/www/html

CMD [ "yarn", "start" ]
