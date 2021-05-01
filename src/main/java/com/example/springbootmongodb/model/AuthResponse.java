package com.example.springbootmongodb.model;

import java.io.Serializable;

public class AuthResponse implements Serializable {

    private String jwt;
    private User user;

    public AuthResponse(String jwt, User user) {
        this.jwt = jwt;
        this.user = user;
    }

    public String getJwt() {
        return jwt;
    }

    public User getUser() {
        return user;
    }
}
