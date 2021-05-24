package com.example.springbootmongodb.service;

import com.example.springbootmongodb.model.*;
import com.example.springbootmongodb.respository.MovieRepository;
import com.example.springbootmongodb.respository.UserRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mongodb.BasicDBObject;
import com.mongodb.DBObject;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.gridfs.GridFsTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Collection;
import java.util.Date;
import java.util.NoSuchElementException;

@Service
public class MovieService {

//    @Autowired
//    private MovieRepository movieRepository;

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

    @Value("${app.hyperlink}")
    private String hyperLink;

    public ResponseEntity<String> addMovie(String title,
                                           String description,
                                           String category,
                                           MultipartFile file,
                                           String[] directorsList,
                                           String actorsList) throws JsonProcessingException {
        if(title == null || title.isBlank()) return ResponseEntity.badRequest().body("Missing title");
        if(description == null || description.isBlank()) return ResponseEntity.badRequest().body("Missing description");
        if(file == null || file.isEmpty()) return ResponseEntity.badRequest().body("Missing file");
        if(!checkExtension(file)) return ResponseEntity.badRequest().body("Only .png/.jpg/.jpeg allowed");
        if(!checkCategory(category)) return ResponseEntity.badRequest().body("There's no such category");
        if(directorsList == null) return ResponseEntity.badRequest().body("Please enter atleast 1 director");
        if (actorsList == null || actorsList.isBlank()) return ResponseEntity.badRequest().body("Please enter atleast 1 actor");

        Collection<Actor> deserializedActorsList = new ObjectMapper().readValue(
                actorsList, new TypeReference<>() {
                }
        );

        try {
            Movie movie = new Movie();
            movie.setTitle(title);
            movie.setDescription(description);
            movie.setCategory(category);
            for (String director : directorsList) movie.addDirector(director);
            for (Actor actor : deserializedActorsList) movie.addActor(actor);
            if (checkContext(title, file, movie)) return ResponseEntity.badRequest().body("File has no content");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Something went wrong");
        }

        return ResponseEntity.ok("Movie uploaded successfully");
    }

    public ResponseEntity<String> editMovie(String id,
                                            String title,
                                            String description,
                                            String category,
                                            MultipartFile file,
                                            String[] directorsList,
                                            String actorsList) throws JsonProcessingException {
        if(title == null || title.isBlank()) return ResponseEntity.badRequest().body("Missing title");
        if(description == null || description.isBlank()) return ResponseEntity.badRequest().body("Missing description");
        if(!checkCategory(category)) return ResponseEntity.badRequest().body("There's no such category");

        Collection<Actor> deserializedActorsList = new ObjectMapper().readValue(
                actorsList, new TypeReference<>() {
                }
        );
        try {
            Movie movie = movieRepository.findById(id).get();
            movie.setTitle(title);
            movie.setDescription(description);
            movie.setCategory(category);
            movie.resetActors();
            movie.resetDirectors();
            for (String director : directorsList) movie.addDirector(director);
            for (Actor actor : deserializedActorsList) movie.addActor(actor);
            if(file == null || file.isEmpty()) {
                movieRepository.save(movie);
            } else {
                if(!checkExtension(file)) return ResponseEntity.badRequest().body("Only .png/.jpg/.jpeg allowed");
                String movieId = movie.getUrl().split(hyperLink + "api/file/movies/")[1];
                gridFsTemplate.delete(new Query(Criteria.where("_id").is(movieId)));
                if (checkContext(title, file, movie)) return ResponseEntity.badRequest().body("File has no content");
            }
        } catch (NoSuchElementException | IOException exception) {
            return ResponseEntity.badRequest().body("Movie not found");
        }

        return ResponseEntity.ok("Movie updated successfully");
    }

    private boolean checkContext(String title, MultipartFile file, Movie movie) throws IOException {
        DBObject metaData = new BasicDBObject();
        metaData.put("title", title);
        try {
            file.getInputStream();
        } catch (IOException e) {
            return true;
        }
        ObjectId id = gridFsTemplate.store(file.getInputStream(), file.getName(), file.getContentType(), metaData);
        movie.setUrl(hyperLink + "api/file/movies/" + id.toString());
        movieRepository.save(movie);
        return false;
    }

    public String deleteMovie(String id) {
        try {
            Movie movie = movieRepository.findById(id).get();

            String movieId = movie.getUrl().split(hyperLink + "api/file/movies/")[1];
            gridFsTemplate.delete(new Query(Criteria.where("_id").is(movieId)));
            movieRepository.deleteById(id);

        } catch (NoSuchElementException exception) {
            return "Movie not found";
        } catch (Exception e) {
            return "Something went wrong";
        }

        return "Movie deleted successfully";
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

    private boolean checkExtension(MultipartFile file) {
        String extension = file.getContentType();
        assert extension != null;
        switch (extension) {
            case "image/png":
            case "image/jpg":
            case "image/jpeg":
                return true;
        }
        return false;
    }

    private boolean checkCategory(String category) {
        String[] categories = {"Documentaries", "Family", "Fantasy", "Horror", "Comedies", "Action & Adventure", "Romantic", "Dramas"};
        for(String value : categories) {
            if(value.equals(category)) return true;
        }
        return false;
    }
}
