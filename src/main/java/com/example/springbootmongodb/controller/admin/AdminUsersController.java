package com.example.springbootmongodb.controller.admin;

import com.example.springbootmongodb.service.admin.AdminUsersService;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("api/admin/users")
public class AdminUsersController {

    private final AdminUsersService adminUsersService;

    public AdminUsersController(AdminUsersService adminUsersService) {
        this.adminUsersService = adminUsersService;
    }

    @GetMapping
    public void test(@RequestParam("email") String email) {
        adminUsersService.editUserEmail(email);
    }
}
