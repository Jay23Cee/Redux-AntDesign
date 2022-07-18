FROM golang:alpine AS builder
WORKDIR /my-app/server
COPY go.mod .
COPY go.sum .
COPY . .
RUN go get -d -v
RUN go build -v



FROM node:alpine
WORKDIR /my-app/src
COPY package.json ./
COPY package-lock.json ./
COPY ./ ./

RUN npm i
RUN npm run build
ENV REACT_APP_URL="http://localhost:8080"
EXPOSE  8080
# start app
CMD ["npm run dev"]
