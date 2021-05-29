package com.example.springbootmongodb.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.DBRef;

@Getter
@Setter
@AllArgsConstructor
public class Rate {

    private int rate;

    @DBRef
    private User user;
}
