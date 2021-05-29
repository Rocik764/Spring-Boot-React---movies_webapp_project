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
    @Size(min = 2, max = 255)
    private String name;

    @NotNull
    @Size(min = 2, max = 255)
    private String second_name;

    @NotNull
    @Size(min = 2, max = 255)
    private String role;
}
