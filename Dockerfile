

FROM node:alpine
WORKDIR /my-app/src
COPY package.json ./
COPY package-lock.json ./
COPY ./ ./
RUN npm i

EXPOSE  3000
# start app
CMD ["npm", "run", "start"]
