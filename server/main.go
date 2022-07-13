package main

import (
	"fmt"
	"net/http"
	"time"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
)

func main() {

	r := chi.NewRouter()

	r.Use(middleware.RequestID)
	r.Use(middleware.RealIP)
	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)

	r.Use(middleware.Timeout(60 * time.Second))

	r.Get("/", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("mongodb+srv://mongo:LOsLH6a40mcR0QzB@cluster0.esomu.mongodb.net/?retryWrites=true&w=majority"))
	})

	r.Post("/add", addbooks)
	r.Post("/edit", editbook)
	r.Get("/read", getBooks)
	r.Post("/delete", deletebook)

	// Mount the admin sub-router
	fmt.Print("ACTIVE")
	http.ListenAndServe(":3333", r)

}
