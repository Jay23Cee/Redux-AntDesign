FROM golang:alpine AS builder
WORKDIR /my-app/server
COPY go.mod .
COPY go.sum .
COPY . .
RUN go get -d -v
RUN go build -v
CMD ["go","run","."]


FROM node:alpine
WORKDIR /my-app/src
COPY package.json ./
COPY package-lock.json ./
COPY ./ ./

RUN npm i
ENV REACT_APP_URL="http://localhost:80"
EXPOSE  3000
# start app
CMD ["npm", "run", "start"]
