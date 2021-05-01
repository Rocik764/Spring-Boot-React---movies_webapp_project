package com.example.springbootmongodb.controller.admin;

import com.example.springbootmongodb.respository.MovieRepository;
import com.example.springbootmongodb.service.MovieService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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
    @PostMapping("add")
    public ResponseEntity<String> addMovie(String title,
                                           String description,
                                           String category,
                                           MultipartFile file) {
        return ResponseEntity.ok(movieService.addMovie(title, description, category, file));
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
