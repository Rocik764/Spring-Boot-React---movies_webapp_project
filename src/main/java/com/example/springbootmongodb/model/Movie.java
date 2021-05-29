package com.example.springbootmongodb.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Document("movies")
public class Movie {

    @Id
    private String id;
    private String title;
    private String description;
    private List<String> directors = new ArrayList<>();
    private String url;
    private String category;
    private List<Rate> rates = new ArrayList<>();
    @DBRef
    private List<Comment> comments = new ArrayList<>();
    private List<Actor> actors = new ArrayList<>();

    public Movie(String id,
                 String title,
                 String description,
                 String url,
                 String category) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.url = url;
        this.category = category;
    }

    public void addDirector(String director) {
        this.directors.add(director);
    }

    public void addRate(Rate rate) {
        this.rates.add(rate);
    }

    public void addComment(Comment comment) {
        this.comments.add(comment);
    }

    public void addActor(Actor actor) {
        this.actors.add(actor);
    }

    public void resetActors() {
        this.actors = new ArrayList<>();
    }

    public void resetDirectors() {
        this.directors = new ArrayList<>();
    }

    public String toString() {
        return "Movie: " + this.title + "\nDescription: " + this.description;
    }
}
