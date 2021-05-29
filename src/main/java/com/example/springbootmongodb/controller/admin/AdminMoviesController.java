package com.example.springbootmongodb.controller.admin;

import com.example.springbootmongodb.service.admin.AdminMoviesService;
import com.example.springbootmongodb.wrapper.MovieWrapper;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Validated
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("api/admin")
public class AdminMoviesController {

    private final AdminMoviesService adminMoviesService;

    public AdminMoviesController(AdminMoviesService adminMoviesService) {
        this.adminMoviesService = adminMoviesService;
    }

    /**
     * response entity to odpowiedź HTTP, w której możemy kontrolować wszystko,
     * np. headers, status code (kody odpowiedzi) oraz body w które wrzucamy jakiś obiekt np.
     */
    @RequestMapping(value="add", method = RequestMethod.POST, consumes = {"multipart/form-data"})
    public ResponseEntity addMovie(@RequestPart("movieWrapper") @Valid MovieWrapper movieWrapper,
                                   @RequestPart("file") @NotNull MultipartFile file) {
        return adminMoviesService.addMovie(
                movieWrapper.getTitle(),
                movieWrapper.getDescription(),
                movieWrapper.getCategory(),
                file,
                movieWrapper.getDirectorsList(),
                movieWrapper.getActorsList()
        );
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<String> deleteMovie(@PathVariable("id") String id) {
        return ResponseEntity.ok(adminMoviesService.deleteMovie(id));
    }

    @RequestMapping(value="editMovie", method = RequestMethod.PATCH, consumes = {"multipart/form-data"})
    public ResponseEntity editMovie(@RequestPart("id") @Valid @NotNull @NotBlank String id,
                                    @RequestPart("movieWrapper") @Valid MovieWrapper movieWrapper,
                                    @RequestPart(value = "file", required = false) MultipartFile file) {
        return adminMoviesService.editMovie(
                id,
                movieWrapper.getTitle(),
                movieWrapper.getDescription(),
                movieWrapper.getCategory(),
                file,
                movieWrapper.getDirectorsList(),
                movieWrapper.getActorsList()
        );
    }
}
