package com.example.springbootmongodb.respository;

import com.example.springbootmongodb.model.Movie;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface MovieRepository extends MongoRepository<Movie, String> {

    public List<Movie> findByCategory(String category);
}
