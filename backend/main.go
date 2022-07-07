package main

import (
	"context"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"os"

	"net/http"
	"time"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"

	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type Post struct {
	Title string `bson:"title,omitempty"`
	Body  string `bson:"body,omitempty"`
}

type Book struct {
	Title  string `bson:"Title,omitempty"`
	Author string `bson:"Author,omitempty"`

	ID string `json:"ID,omitempty" bson:"_id,omitempty"`

	// CreatedAt time.Time
	// UpdatedAt time.Time
	// DeletedAt gorm.DeletedAt `gorm:"index"`
}

func getBooks(w http.ResponseWriter, r *http.Request) {
	err := godotenv.Load(".env")
	if err != nil {
		panic(err)
	}
	url := os.Getenv("REACT_APP_GO_URL")
	mymap := make(map[int]Book)
	clientOptions := options.Client().
		ApplyURI(url)
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	client, err := mongo.Connect(ctx, clientOptions)
	if err != nil {
		panic(err)
	}

	col := client.Database("BookAPI").Collection("book")
	var results []Book

	// Get a MongoDB document using the FindOne() method
	cursor, err := col.Find(context.TODO(), bson.D{})
	if err != nil {
		panic(err)
	}

	if err = cursor.All(context.TODO(), &results); err != nil {
		panic(err)
	}

	count := 0

	for _, result := range results {
		fmt.Println(result.ID)
		mymap[count] = result
		count = count + 1
	}

	e, err := json.Marshal(mymap)
	if err != nil {
		panic(err)

	}
	w.Write([]byte(e))

}

func deletebook(w http.ResponseWriter, r *http.Request) {

	jsonMap := make(map[string]Book)
	body, err := ioutil.ReadAll(r.Body)
	err = json.Unmarshal([]byte(body), &jsonMap)
	var temp Book
	temp = jsonMap["book"]

	err = godotenv.Load(".env")
	if err != nil {
		panic(err)
	}
	url := os.Getenv("REACT_APP_GO_URL")
	clientOptions := options.Client().
		ApplyURI(url)
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	client, err := mongo.Connect(ctx, clientOptions)
	if err != nil {
		panic(err)
	}
	collection := client.Database("BookAPI").Collection("book")

	objid, err := primitive.ObjectIDFromHex(temp.ID)
	if err != nil {
		panic(err)
	}

	result, err := collection.DeleteOne(ctx, bson.M{"_id": objid})
	if err != nil {
		panic(err)
	}
	fmt.Fprintf(w, "\nDelete has Completed %v", result.DeletedCount)

}

func addbooks(w http.ResponseWriter, r *http.Request) {
	body, err := ioutil.ReadAll(r.Body)

	jsonMap := make(map[string]Book)

	err = json.Unmarshal([]byte(body), &jsonMap)
	book := jsonMap["book"]

	fmt.Println(book)
	if err != nil {
		panic(err)
	}

	err = godotenv.Load(".env")
	if err != nil {
		panic(err)
	}
	url := os.Getenv("REACT_APP_GO_URL")

	clientOptions := options.Client().
		ApplyURI(url)
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	client, err := mongo.Connect(ctx, clientOptions)
	if err != nil {
		log.Fatal(err)
		panic(err)
	}
	collection := client.Database("BookAPI").Collection("book")

	doc := bson.D{{"Title", book.Title}, {"Author", book.Author}, {"_id", primitive.NewObjectID()}}
	result, err := collection.InsertOne(ctx, doc)
	if err != nil {
		panic(err)
	}
	fmt.Fprintf(w, "\nBook has been added %v", result.InsertedID)
}

func CheckError(e error) {
	panic("unimplemented")
}

func editbook(w http.ResponseWriter, r *http.Request) {

	jsonMap := make(map[string]Book)
	body, err := ioutil.ReadAll(r.Body)
	err = json.Unmarshal([]byte(body), &jsonMap)
	var book Book
	book = jsonMap["book"]

	err = godotenv.Load(".env")
	if err != nil {
		panic(err)
	}
	url := os.Getenv("REACT_APP_GO_URL")
	clientOptions := options.Client().
		ApplyURI(url)
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	client, err := mongo.Connect(ctx, clientOptions)
	if err != nil {
		log.Fatal(err)
		panic(err)
	}
	collection := client.Database("BookAPI").Collection("book")

	id, _ := primitive.ObjectIDFromHex(book.ID)
	result, err := collection.UpdateOne(
		ctx,
		bson.M{"_id": id},
		bson.D{
			{"$set", bson.D{{"Title", book.Title}, {"Author", book.Author}}},
		},
	)
	if err != nil {
		panic(err)
	}

	fmt.Printf("Updated %v Documents!\n", result.ModifiedCount)

}
func main() {

	r := chi.NewRouter()

	r.Use(middleware.RequestID)
	r.Use(middleware.RealIP)
	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)

	r.Use(middleware.Timeout(60 * time.Second))

	r.Get("/", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("hi"))
	})

	r.Post("/add", addbooks)
	r.Post("/edit", editbook)
	r.Get("/read", getBooks)
	r.Post("/delete", deletebook)

	// Mount the admin sub-router
	fmt.Print("ACTIVE")
	http.ListenAndServe(":3333", r)

}
