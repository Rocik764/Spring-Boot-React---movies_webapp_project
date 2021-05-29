package com.example.springbootmongodb.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@NoArgsConstructor
@Document
public class Comment {

    @Id
    private String id;
    private String content;
    @DBRef
    private User user;
    private String date;
}