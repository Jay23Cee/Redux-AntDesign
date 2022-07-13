FROM golang:buster
WORKDIR "/my-app/server"
COPY go.mod .
COPY go.sum .
COPY . .
RUN go get -d -v
RUN go build -v
CMD ["go","run","."]