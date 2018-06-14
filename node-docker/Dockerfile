FROM node:carbon-alpine

MAINTAINER Ujjawal Garg <ujjawal.1224@gmail.com>

ENV DEBIAN_FRONTEND noninteractive


# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
COPY . .

EXPOSE 8080

RUN npm run build

CMD [ "npm", "start" ]