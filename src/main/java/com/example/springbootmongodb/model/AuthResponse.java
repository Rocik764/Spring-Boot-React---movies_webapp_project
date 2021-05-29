package com.example.springbootmongodb.model;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.io.Serializable;

@Getter
@AllArgsConstructor
public class AuthResponse implements Serializable {

    private String jwt;
    private User user;
}
