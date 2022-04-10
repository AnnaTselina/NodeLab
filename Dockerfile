FROM node:16.13.1

WORKDIR /app

COPY package.json /app

EXPOSE 3000

RUN npm install --legacy-peer-deps

COPY . .

CMD ["npm","run", "build"]
