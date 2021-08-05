FROM node:14
RUN apt update && apt install nano -y

WORKDIR /usr/src/app

COPY . .
RUN npm install 

RUN npm run build:local
CMD ["npm", "run", "start:local"]
