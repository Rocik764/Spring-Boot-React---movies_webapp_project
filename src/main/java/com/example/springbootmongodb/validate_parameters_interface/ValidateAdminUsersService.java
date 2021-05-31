package com.example.springbootmongodb.validate_parameters_interface;

import org.hibernate.validator.constraints.Length;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Validated
public interface ValidateAdminUsersService {

    ResponseEntity editUserEmail(String id,
                       @NotNull @NotBlank @Email String email);
    ResponseEntity setAdmin(String id);
    ResponseEntity unsetAdmin(String id);
}
