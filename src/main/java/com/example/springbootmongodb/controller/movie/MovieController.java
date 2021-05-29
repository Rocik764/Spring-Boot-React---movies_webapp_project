package com.example.springbootmongodb.controller.movie;

import com.example.springbootmongodb.model.Movie;
import com.example.springbootmongodb.respository.MovieRepository;
import com.example.springbootmongodb.service.movie.MovieService;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.NoSuchElementException;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("api/movie")
public class MovieController {

    private final MovieService movieService;
    private final MovieRepository movieRepository;

    public MovieController(MovieService movieService, MovieRepository movieRepository) {
        this.movieService = movieService;
        this.movieRepository = movieRepository;
    }

    @GetMapping("list")
    public List<Movie> getMovies() {
        return movieRepository.findAll();
    }

    @GetMapping("mostCommented")
    public List<Movie> getMostCommented() {
        return movieService.getMostCommented();
    }

    @GetMapping("topRated")
    public List<Movie> getTopRated() {
        return movieService.getTopRated();
    }

    @GetMapping("list/{category}")
    public List<Movie> getMoviesByCategory(@PathVariable("category") String category) {
        return movieRepository.findByCategory(category);
    }

    @GetMapping("get/{id}")
    public Movie getMovie(@PathVariable("id") String id) {
        try {
            return movieRepository.findById(id).get();
        } catch (NoSuchElementException e) {
            return null;
        }
    }
}
