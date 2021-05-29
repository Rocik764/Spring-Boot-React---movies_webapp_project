package com.example.springbootmongodb.service.movie;

import com.example.springbootmongodb.custom_mongodb_aggregation.CustomProjectAggregationOperation;
import com.example.springbootmongodb.model.*;
import com.example.springbootmongodb.respository.MovieRepository;
import com.example.springbootmongodb.respository.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.aggregation.*;
import org.springframework.data.mongodb.gridfs.GridFsTemplate;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class MovieService {

    private final MovieRepository movieRepository;
    private final GridFsTemplate gridFsTemplate;
    private final UserRepository userRepository;
    private final MongoOperations mongoOperations;

    public MovieService(MovieRepository movieRepository,
                        GridFsTemplate gridFsTemplate,
                        UserRepository userRepository,
                        MongoOperations mongoOperations) {
        this.movieRepository = movieRepository;
        this.gridFsTemplate = gridFsTemplate;
        this.userRepository = userRepository;
        this.mongoOperations = mongoOperations;
    }

    public List<Movie> getMostCommented() {
        AggregationOperation limit = Aggregation.limit(4);
        ProjectionOperation projectionOperation = Aggregation.project().and("$comments").size().as("comments");
        String query2 = "{ $sort: { comments:-1 }}";

        TypedAggregation<Movie> aggregation = Aggregation.newAggregation(
                Movie.class,
                projectionOperation,
                new CustomProjectAggregationOperation(query2),
                limit
        );

        return getMoviesWithAggregation(aggregation);
    }

    public Page<Movie> getMostCommented2() {
        PageRequest request = PageRequest.of(0, 4, Sort.Direction.DESC, "comments");
        Page<Movie> movies = movieRepository.findAll(request);
        return movies;
    }

    public List<Movie> getTopRated() {
        AggregationOperation limit = Aggregation.limit(4);
        String query = "{ $project: { avg: { $avg: \"$rates.rate\"}}}";
        String query2 = "{ $sort: { avg:-1 }}";

        TypedAggregation<Movie> aggregation = Aggregation.newAggregation(
                Movie.class,
                new CustomProjectAggregationOperation(query),
                new CustomProjectAggregationOperation(query2),
                limit
        );

        return getMoviesWithAggregation(aggregation);
    }

    private List<Movie> getMoviesWithAggregation(TypedAggregation<Movie> aggregation) {

        AggregationResults<Movie> results =
                mongoOperations.aggregate(aggregation, Movie.class);

        List<Movie> mostCommentedMovies = new ArrayList<>();
        for(Movie movie : results.getMappedResults()) {
            String id = movie.getId();
            Movie movieById = movieRepository.findById(id).get();
            mostCommentedMovies.add(movieById);
        }

        return mostCommentedMovies;
    }
}
