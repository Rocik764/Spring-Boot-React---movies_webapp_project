package com.example.springbootmongodb.exceptions;

import org.springframework.http.ResponseEntity;

public class ResponseEntityBuilder {

    public static ResponseEntity<Object> build(ErrorResponse errorResponse) {
        return new ResponseEntity<>(errorResponse, errorResponse.getStatus());
    }
}
