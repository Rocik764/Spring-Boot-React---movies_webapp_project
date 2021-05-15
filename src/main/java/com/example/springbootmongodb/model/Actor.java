package com.example.springbootmongodb.model;

import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class Actor {

    private String name;
    private String second_name;
    private String role;

    public Actor() {}

    public Actor(String name, String second_name, String role) {
        this.name = name;
        this.second_name = second_name;
        this.role = role;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSecond_name() {
        return second_name;
    }

    public void setSecond_name(String second_name) {
        this.second_name = second_name;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
