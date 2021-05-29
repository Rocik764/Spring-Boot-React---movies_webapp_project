package com.example.springbootmongodb.validate_parameters_interface;

import org.springframework.validation.annotation.Validated;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Validated
public interface ValidateAdminUsersService {

    void editUserEmail(@NotNull @NotBlank @Email String email);
}
