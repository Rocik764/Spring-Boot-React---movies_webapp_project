package com.example.springbootmongodb.respository;

import com.example.springbootmongodb.model.Movie;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface MovieRepository extends MongoRepository<Movie, String> {

    List<Movie> findByCategory(String category);
    Page<Movie> findAll(Pageable pageable);
}
