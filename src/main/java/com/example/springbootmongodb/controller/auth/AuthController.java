package com.example.springbootmongodb.controller.auth;

import com.example.springbootmongodb.model.AuthRequest;
import com.example.springbootmongodb.model.AuthResponse;
import com.example.springbootmongodb.model.User;
import com.example.springbootmongodb.service.AuthService;
import com.example.springbootmongodb.service.CustomUserDetailsService;
import com.example.springbootmongodb.user_details.CustomUserDetails;
import com.example.springbootmongodb.util.JwtUtil;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("api/auth")
public class AuthController {

    private final AuthService authService;
    private final AuthenticationManager authenticationManager;
    private final CustomUserDetailsService customUserDetailsService;
    private final JwtUtil jwtUtil;

    public AuthController(AuthService authService,
                           AuthenticationManager authenticationManager,
                           CustomUserDetailsService customUserDetailsService,
                           JwtUtil jwtUtil) {
        this.authService = authService;
        this.authenticationManager = authenticationManager;
        this.customUserDetailsService = customUserDetailsService;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("register")
    public ResponseEntity<?> register(@RequestBody User user) {

        try {
            authService.save(user);
        } catch (DataIntegrityViolationException e) {
            return ResponseEntity.badRequest()
                    .body("User already exists");
        }

        return ResponseEntity.ok()
                .body("Registered!");
    }

    @RequestMapping(value = "login", method = RequestMethod.POST)
    public ResponseEntity<?> authenticate(@RequestBody AuthRequest authRequest) throws Exception {

        try{
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authRequest.getName(), authRequest.getPassword())
            );
        } catch (BadCredentialsException e) {
            return ResponseEntity.badRequest()
                    .body("Bad credentials");
        }

        final CustomUserDetails userDetails = customUserDetailsService.loadUserByUsername(authRequest.getName());
        final String jwt = jwtUtil.generateToken(userDetails);

        return ResponseEntity.ok(new AuthResponse(jwt, userDetails.getUser()));
    }
}