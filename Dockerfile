FROM node:19-slim

RUN apt update && apt install -y procps

USER node

WORKDIR /home/node/app

CMD [ "tail", "-f", "/dev/null" ]
