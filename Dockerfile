FROM node:10.17-alpine

# Set maintainers.
MAINTAINER Daniel Kokott <dako@berlingskemedia.dk>

# Mount current dir as a volume containing all source code.
WORKDIR /app

COPY ./client /app/client
COPY ./server /app/server
ADD package.json /app
ADD package-lock.json /app

RUN npm i --production

EXPOSE 8000

CMD ["node", "server/index.js"]
