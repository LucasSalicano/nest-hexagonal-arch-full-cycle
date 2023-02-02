FROM node:19-slim

RUN apt update && apt install -y procps

WORKDIR /home/node/app

USER node

CMD [ "tail", "-f", "/dev/null" ]