package com.example.springbootmongodb.service.admin;

import com.example.springbootmongodb.model.User;
import com.example.springbootmongodb.respository.UserRepository;
import com.example.springbootmongodb.validate_parameters_interface.ValidateAdminUsersService;
import net.bytebuddy.utility.RandomString;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class AdminUsersService implements ValidateAdminUsersService {

    private final UserRepository userRepository;

    public AdminUsersService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> getUsers() {
        return userRepository.findAll();
    }

    @Override
    @Transactional
    public ResponseEntity editUserEmail(String id, String email) {
        User user = userRepository.findById(id).get();
        try {
            user.setEmail(email);
            user.setEnabled(false);
            String randomCode = RandomString.make(64);
            user.setVerificationCode(randomCode);
            userRepository.save(user);
            return ResponseEntity.ok("Email changed");
        } catch (NoSuchElementException exception) {
            return ResponseEntity.badRequest().body("user not found");
        }
    }

    @Override
    public ResponseEntity setAdmin(String id) {
        User user = userRepository.findById(id).get();
        try {
            String adminRole = "USER,ADMIN";
            user.setRoles(adminRole);
            userRepository.save(user);
            return ResponseEntity.ok("admin set");
        } catch (NoSuchElementException exception) {
            return ResponseEntity.badRequest().body("user not found");
        }
    }

    @Override
    public ResponseEntity unsetAdmin(String id) {
        User user = userRepository.findById(id).get();
        try {
            String adminRole = "USER";
            user.setRoles(adminRole);
            userRepository.save(user);
            return ResponseEntity.ok("admin unset");
        } catch (NoSuchElementException exception) {
            return ResponseEntity.badRequest().body("user not found");
        }
    }
}
