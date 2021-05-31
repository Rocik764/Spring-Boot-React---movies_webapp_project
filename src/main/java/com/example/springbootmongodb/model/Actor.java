package com.example.springbootmongodb.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Getter
@Setter
@AllArgsConstructor
@Document
public class Actor {

    @NotNull
    @Size(min = 2, max = 255, message = "Actor's name field must be between {min} and {max} characters long")
    private String name;

    @NotNull
    @Size(min = 2, max = 255, message = "Actor's second name field must be between {min} and {max} characters long")
    private String second_name;

    @NotNull
    @Size(min = 2, max = 255, message = "Actor's role field must be between {min} and {max} characters long")
    private String role;
}
