package com.example.springbootmongodb.controller.movie;

import com.mongodb.client.gridfs.model.GridFSFile;
import org.springframework.core.io.InputStreamResource;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.gridfs.GridFsOperations;
import org.springframework.data.mongodb.gridfs.GridFsTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.io.IOException;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("api/file")
public class GetMovieController {

    private final GridFsTemplate gridFsTemplate;
    private final GridFsOperations gridFsOperations;

    public GetMovieController(GridFsTemplate gridFsTemplate, GridFsOperations gridFsOperations) {
        this.gridFsTemplate = gridFsTemplate;
        this.gridFsOperations = gridFsOperations;
    }

    @GetMapping("movies/{id}")
    public ResponseEntity<?> getMovie(@PathVariable("id") String id) {
        GridFSFile gridFSFile;
        InputStreamResource inputStreamResource;
        MediaType mediaType;

        try {
            gridFSFile = gridFsTemplate.findOne(new Query(Criteria.where("_id").is(id)));
            if(gridFSFile == null) return new ResponseEntity<>("Movie not found in the database", HttpStatus.BAD_REQUEST);
            if(gridFSFile.getMetadata() == null) return new ResponseEntity<>("Movie has no metadata", HttpStatus.BAD_REQUEST);
            mediaType = MediaType.valueOf(gridFsOperations.getResource(gridFSFile).getContentType());
            inputStreamResource = new InputStreamResource(gridFsOperations.getResource(gridFSFile).getInputStream());
            try {
                gridFsOperations.getResource(gridFSFile).getInputStream();
            } catch (IOException exception) {
                return new ResponseEntity<>("File has no content", HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            return new ResponseEntity<>("Error", HttpStatus.BAD_REQUEST);
        }

        return ResponseEntity.ok().contentType(mediaType).body(inputStreamResource);
    }
}
