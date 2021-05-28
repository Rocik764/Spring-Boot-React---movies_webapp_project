package com.example.springbootmongodb.controller.user;

import com.example.springbootmongodb.service.user.UserMovieService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("api/user/movie")
public class UserMovieController {

    private final UserMovieService userMovieService;

    public UserMovieController(UserMovieService userMovieService) {
        this.userMovieService = userMovieService;
    }

    @PatchMapping("rate/{id}")
    public ResponseEntity rateMovie(@PathVariable("id") String id,
                                    @RequestParam("userId") String userId,
                                    @RequestParam("rate") int rate) {
        return userMovieService.rateMovie(id, userId, rate);
    }

    @PostMapping("comment/{id}")
    public ResponseEntity<String> addComment(@PathVariable("id") String id,
                                             String userId,
                                             String content) {
        return userMovieService.addComment(id, userId, content);
    }
}
