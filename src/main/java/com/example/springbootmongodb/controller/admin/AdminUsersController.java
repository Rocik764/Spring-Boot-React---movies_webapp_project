package com.example.springbootmongodb.controller.admin;

import com.example.springbootmongodb.model.User;
import com.example.springbootmongodb.service.admin.AdminUsersService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("api/admin/users")
public class AdminUsersController {

    private final AdminUsersService adminUsersService;

    public AdminUsersController(AdminUsersService adminUsersService) {
        this.adminUsersService = adminUsersService;
    }

    @GetMapping("list")
    public List<User> getUsers() {
        return adminUsersService.getUsers();
    }

    @PatchMapping("editMail/{id}")
    public ResponseEntity editEmail(@PathVariable("id") String id,
                          @RequestParam("email") String email) {
        return adminUsersService.editUserEmail(id, email);
    }

    @PatchMapping("setAdmin/{id}")
    public ResponseEntity setAdmin(@PathVariable("id") String id) {
        return adminUsersService.setAdmin(id);
    }

    @PatchMapping("unsetAdmin/{id}")
    public ResponseEntity unsetAdmin(@PathVariable("id") String id) {
        return adminUsersService.unsetAdmin(id);
    }
}
