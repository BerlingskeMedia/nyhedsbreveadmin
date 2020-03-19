FROM node:10.17-alpine

# Set maintainers.
MAINTAINER Daniel Kokott <dako@berlingskemedia.dk>

# Mount current dir as a volume containing all source code.
WORKDIR /nyhedsbreveprofiladmin

COPY ./client /nyhedsbreveprofiladmin/client
COPY ./server /nyhedsbreveprofiladmin/server
ADD package.json /nyhedsbreveprofiladmin
ADD package-lock.json /nyhedsbreveprofiladmin

RUN npm i --production

EXPOSE 8000

CMD ["node", "server/index.js"]
