FROM node:15-alpine

WORKDIR /app

ADD https://raw.githubusercontent.com/eficode/wait-for/master/wait-for /wait-for 
RUN chmod +x /wait-for

COPY package.json package-lock.json ./
RUN npm i

COPY . .

CMD /wait-for mongo:27017 -- npm run start:dev                                  
