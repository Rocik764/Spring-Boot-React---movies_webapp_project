package com.example.springbootmongodb.exceptions;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import org.springframework.web.multipart.support.MissingServletRequestPartException;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import javax.validation.ConstraintViolationException;

@ControllerAdvice
public class CustomExceptionHandler extends ResponseEntityExceptionHandler {

    @Override
    protected ResponseEntity<Object> handleHttpMessageNotReadable(
            HttpMessageNotReadableException ex,
            HttpHeaders headers,
            HttpStatus status,
            WebRequest request) {

        List<String> details = new ArrayList<>();
        details.add(ex.getMessage());

        ErrorResponse err = new ErrorResponse(
                LocalDateTime.now(),
                HttpStatus.BAD_REQUEST,
                "Malformed JSON request" ,
                details);

        return ResponseEntityBuilder.build(err);
    }

    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(
            MethodArgumentNotValidException ex,
            HttpHeaders headers,
            HttpStatus status,
            WebRequest request) {

        List<String> details = new ArrayList<String>();
        details = ex.getBindingResult()
                .getFieldErrors()
                .stream()
                .map(error -> error.getField() + ": " +error.getDefaultMessage())
                .collect(Collectors.toList());

        ErrorResponse err = new ErrorResponse(
                LocalDateTime.now(),
                HttpStatus.BAD_REQUEST,
                "Validation Errors" ,
                details);

        return ResponseEntityBuilder.build(err);
    }

    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    protected ResponseEntity<Object> handleMethodArgumentTypeMismatch(
            MethodArgumentTypeMismatchException ex,
            WebRequest request) {

        List<String> details = new ArrayList<String>();
        details.add(ex.getMessage());

        ErrorResponse err = new ErrorResponse(
                LocalDateTime.now(),
                HttpStatus.BAD_REQUEST,
                "Type Mismatch" ,
                details);

        return ResponseEntityBuilder.build(err);
    }

    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<?> handleConstraintViolationException(
            Exception ex,
            WebRequest request) {

        List<String> details = Arrays.asList(ex.getMessage().split(",\\s*"));

        ErrorResponse err = new ErrorResponse(
                LocalDateTime.now(),
                HttpStatus.BAD_REQUEST,
                "Constraint Violations" ,
                details);

        return ResponseEntityBuilder.build(err);
    }

    @Override
    protected ResponseEntity<Object> handleMissingServletRequestPart(MissingServletRequestPartException ex, HttpHeaders headers, HttpStatus status, WebRequest request) {
        List<String> details = Arrays.asList(ex.getMessage().split(",\\s*"));

        ErrorResponse err = new ErrorResponse(
                LocalDateTime.now(),
                HttpStatus.BAD_REQUEST,
                "Missing Request Part" ,
                details);

        return ResponseEntityBuilder.build(err);
    }

    @Override
    protected ResponseEntity<Object> handleMissingServletRequestParameter(
            MissingServletRequestParameterException ex, HttpHeaders headers,
            HttpStatus status, WebRequest request) {

        List<String> details = new ArrayList<String>();
        details.add(ex.getParameterName() + " parameter is missing");

        ErrorResponse err = new ErrorResponse(
                LocalDateTime.now(),
                HttpStatus.BAD_REQUEST,
                "Missing Parameters" ,
                details);

        return ResponseEntityBuilder.build(err);
    }
}
