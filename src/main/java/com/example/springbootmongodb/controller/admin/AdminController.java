package com.example.springbootmongodb.controller.admin;

import com.example.springbootmongodb.model.Actor;
import com.example.springbootmongodb.respository.MovieRepository;
import com.example.springbootmongodb.service.MovieService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("api/admin")
public class AdminController {

    private final MovieService movieService;
    private final MovieRepository movieRepository;

    public AdminController(MovieService movieService, MovieRepository movieRepository) {
        this.movieService = movieService;
        this.movieRepository = movieRepository;
    }

    /**
     * response entity to odpowiedź HTTP, w której możemy kontrolować wszystko,
     * np. headers, status code (kody odpowiedzi) oraz body w które wrzucamy jakiś obiekt np.
     */
    @RequestMapping(value="add", method = RequestMethod.POST, consumes = {"multipart/form-data"})
    public ResponseEntity<String> addMovie(String title,
                                           String description,
                                           String category,
                                           MultipartFile file,
                                           @RequestParam(value = "directorsList[]") String[] directorsList,
                                           String actorsList) throws JsonProcessingException {
        return movieService.addMovie(title, description, category, file, directorsList, actorsList);
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<String> deleteMovie(@PathVariable("id") String id) {
        return ResponseEntity.ok(movieService.deleteMovie(id));
    }

    @PatchMapping("editMovie")
    public ResponseEntity<String> editMovie(String id,
                                            String title,
                                            String description,
                                            String category,
                                            MultipartFile file) {
        return ResponseEntity.ok(movieService.editMovie(id, title, description, category, file));
    }
}
