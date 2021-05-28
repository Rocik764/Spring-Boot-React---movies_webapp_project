package com.example.springbootmongodb.controller.admin;

import com.example.springbootmongodb.service.admin.AdminMovieService;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("api/admin")
public class AdminController {

    private final AdminMovieService adminMovieService;

    public AdminController(AdminMovieService adminMovieService) {
        this.adminMovieService = adminMovieService;
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
        return adminMovieService.addMovie(title, description, category, file, directorsList, actorsList);
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<String> deleteMovie(@PathVariable("id") String id) {
        return ResponseEntity.ok(adminMovieService.deleteMovie(id));
    }

    @PatchMapping("editMovie")
    public ResponseEntity<String> editMovie(String id,
                                            String title,
                                            String description,
                                            String category,
                                            MultipartFile file,
                                            @RequestParam(value = "directorsList[]") String[] directorsList,
                                            String actorsList) throws JsonProcessingException {
        return adminMovieService.editMovie(id, title, description, category, file, directorsList, actorsList);
    }
}
