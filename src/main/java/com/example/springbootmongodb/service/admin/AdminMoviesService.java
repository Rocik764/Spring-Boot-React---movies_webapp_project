package com.example.springbootmongodb.service.admin;

import com.example.springbootmongodb.model.Actor;
import com.example.springbootmongodb.model.Movie;
import com.example.springbootmongodb.respository.MovieRepository;
import com.example.springbootmongodb.respository.UserRepository;
import com.google.gson.Gson;
import com.mongodb.BasicDBObject;
import com.mongodb.DBObject;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.gridfs.GridFsTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Collection;
import java.util.List;
import java.util.NoSuchElementException;

@Service
public class AdminMoviesService {

    private final MovieRepository movieRepository;
    private final GridFsTemplate gridFsTemplate;
    private final UserRepository userRepository;
    private final MongoOperations mongoOperations;
    private static final Gson gson = new Gson();

    public AdminMoviesService(MovieRepository movieRepository,
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
                                           List<String> directorsList,
                                           List<Actor> actorsList) {
        if(!checkExtension(file)) return ResponseEntity.badRequest().body("Only .png/.jpg/.jpeg allowed");

        try {
            Movie movie = new Movie();
            movie.setTitle(title);
            movie.setDescription(description);
            movie.setCategory(category);
            for (String director : directorsList) movie.addDirector(director);
            movie.setActors(actorsList);
            if (checkContext(title, file, movie)) return ResponseEntity.badRequest().body("File has no content");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }

        return ResponseEntity.status(HttpStatus.OK)
                .contentType(MediaType.TEXT_PLAIN)
                .body(gson.toJson("Movie uploaded successfully"));
    }

    public ResponseEntity<String> editMovie(String id,
                                            String title,
                                            String description,
                                            String category,
                                            MultipartFile file,
                                            List<String> directorsList,
                                            List<Actor> actorsList) {
        if(!checkCategory(category)) return ResponseEntity.badRequest().body("There's no such category");

        try {
            Movie movie = movieRepository.findById(id).get();
            movie.setTitle(title);
            movie.setDescription(description);
            movie.setCategory(category);
            movie.resetActors();
            movie.resetDirectors();
            for (String director : directorsList) movie.addDirector(director);
            movie.setActors(actorsList);
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

        //return ResponseEntity.ok(gson.toJson("Movie updated successfully"));
        return ResponseEntity.status(HttpStatus.OK)
                .contentType(MediaType.TEXT_PLAIN)
                .body(gson.toJson("Movie updated successfully"));
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
