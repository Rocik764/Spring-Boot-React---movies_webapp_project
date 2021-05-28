package com.example.springbootmongodb.service.movie;

import com.example.springbootmongodb.custom_mongodb_aggregation.CustomProjectAggregationOperation;
import com.example.springbootmongodb.model.*;
import com.example.springbootmongodb.respository.MovieRepository;
import com.example.springbootmongodb.respository.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationOperation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.data.mongodb.core.aggregation.TypedAggregation;
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

    public Page<Movie> getMostCommented() {
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

        AggregationResults<Movie> results =
                mongoOperations.aggregate(aggregation, Movie.class);

        List<Movie> topRatedMovies = new ArrayList<>();
        for(Movie movie : results.getMappedResults()) {
            String id = movie.getId();
            Movie movieById = movieRepository.findById(id).get();
            topRatedMovies.add(movieById);
        }

        return topRatedMovies;
    }
}
