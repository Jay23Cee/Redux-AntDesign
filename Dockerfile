
FROM node:alpine
WORKDIR /my-app/src
COPY package.json ./
COPY package-lock.json ./
COPY ./ ./
RUN npm i
RUN npm run build
EXPOSE  3000
# start app
CMD ["npm", "start"]    
