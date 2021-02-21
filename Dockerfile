FROM node:14.15-buster-slim

WORKDIR /app

ADD https://raw.githubusercontent.com/eficode/wait-for/master/wait-for /wait-for 
RUN chmod +x /wait-for

COPY package.json package-lock.json tsconfig.json ./
RUN npm i
RUN apt update
RUN apt install -y netcat

COPY . .

CMD /wait-for mongo:27017 -- npm run start:dev

