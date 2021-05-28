package com.example.springbootmongodb.service.user;

import com.example.springbootmongodb.model.Comment;
import com.example.springbootmongodb.model.Movie;
import com.example.springbootmongodb.model.Rate;
import com.example.springbootmongodb.model.User;
import com.example.springbootmongodb.respository.MovieRepository;
import com.example.springbootmongodb.respository.UserRepository;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.NoSuchElementException;

@Service
public class UserMovieService {

    private final MovieRepository movieRepository;
    private final UserRepository userRepository;
    private final MongoOperations mongoOperations;

    public UserMovieService(MovieRepository movieRepository,
                            UserRepository userRepository,
                            MongoOperations mongoOperations) {
        this.movieRepository = movieRepository;
        this.userRepository = userRepository;
        this.mongoOperations = mongoOperations;
    }

    public ResponseEntity rateMovie(String id, String userId, int rate) {
        if(rate > 5 || rate < 1) return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("The number must be between 1 and 5");
        System.out.println("movie: " + id + " | user: " + " | rate: " + rate);
        try {
            Movie movie = movieRepository.findById(id).get();
            User user = userRepository.findById(userId).get();
            for (Rate movieRate : movie.getRates()) {
                String movieUserId = movieRate.getUser().getId();
                if(movieUserId.equals(user.getId())) {
                    movieRate.setRate(rate);
                    movieRepository.save(movie);
                    return ResponseEntity.ok().body("Changed your rate");
                }
            }
            Rate newRate = new Rate(rate, user);
            movie.addRate(newRate);
            movieRepository.save(movie);
            return ResponseEntity.ok().body("Thanks for rating the movie");
        } catch (NoSuchElementException exception) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Movie or user not found");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Something went wrong");
        }
    }

    public ResponseEntity<String> addComment(String id, String userId, String content) {
        if(content.length() > 100 || content.length() < 1) return ResponseEntity.badRequest().body("Comment must be between 1 and 100 characters");

        try {
            Movie movie = movieRepository.findById(id).get();
            User user;
            try { user = userRepository.findById(userId).get(); }
            catch (NoSuchElementException exception) { return ResponseEntity.badRequest().body("User not found"); }
            String now = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
            System.out.println(now);
            Comment comment = new Comment();
            comment.setContent(content);
            comment.setUser(user);
            comment.setDate(now);
            mongoOperations.save(comment);
            movie.addComment(comment);
            movieRepository.save(movie);
            return ResponseEntity.ok().body("Thanks for comment!");
        } catch (NoSuchElementException exception) {
            return ResponseEntity.badRequest().body("Movie not found");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
