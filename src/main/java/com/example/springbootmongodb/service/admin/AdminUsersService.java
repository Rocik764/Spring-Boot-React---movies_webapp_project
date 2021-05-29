package com.example.springbootmongodb.service.admin;

import com.example.springbootmongodb.respository.UserRepository;
import com.example.springbootmongodb.validate_parameters_interface.ValidateAdminUsersService;
import org.springframework.stereotype.Service;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Service
public class AdminUsersService implements ValidateAdminUsersService {

    private final UserRepository userRepository;

    public AdminUsersService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public void editUserEmail(String email) {
        System.out.println(email);
    }
}
