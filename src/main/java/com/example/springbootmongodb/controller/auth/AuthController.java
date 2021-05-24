package com.example.springbootmongodb.controller.auth;

import com.example.springbootmongodb.error.ErrorResponse;
import com.example.springbootmongodb.model.AuthRequest;
import com.example.springbootmongodb.model.AuthResponse;
import com.example.springbootmongodb.model.User;
import com.example.springbootmongodb.service.AuthService;
import com.example.springbootmongodb.service.CustomUserDetailsService;
import com.example.springbootmongodb.user_details.CustomUserDetails;
import com.example.springbootmongodb.util.JwtUtil;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.io.UnsupportedEncodingException;
import java.util.List;
import java.util.stream.Collectors;

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
    public ResponseEntity<?> register(@Valid @RequestBody User user,
                                      BindingResult bindingResult,
                                      HttpServletRequest request) {
        if (bindingResult.hasErrors()) {
            List<String> errors = bindingResult.getAllErrors().stream().map(e -> e.getDefaultMessage()).collect(Collectors.toList());
            return ResponseEntity.badRequest()
                    .body(new ErrorResponse("400", "Validation failure", errors));
        }
        try {
            return authService.save(user, getSiteURL(request));
        } catch (DataIntegrityViolationException e) {
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().body("User already exists");
        } catch (UnsupportedEncodingException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (MessagingException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @RequestMapping(value = "login", method = RequestMethod.POST)
    public ResponseEntity<?> authenticate(@RequestBody AuthRequest authRequest,
                                          HttpServletRequest request) throws Exception {
        System.out.println(authRequest.getEmail());
        try{
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authRequest.getEmail(), authRequest.getPassword())
            );
        } catch (BadCredentialsException e) {
            return ResponseEntity.badRequest()
                    .body("Bad credentials");
        } catch (DisabledException e) {
            System.out.println(getSiteURL(request) + "/api/auth/resend/" + authRequest.getEmail());
            return ResponseEntity.badRequest()
                    .body("Your account is disabled, click the button below to resend verification email ;" +
                            getSiteURL(request) + "/api/auth/resend/" + authRequest.getEmail());
        }

        final CustomUserDetails userDetails = customUserDetailsService.loadUserByUsername(authRequest.getEmail());
        final String jwt = jwtUtil.generateToken(userDetails);

        return ResponseEntity.ok(new AuthResponse(jwt, userDetails.getUser()));
    }

    @GetMapping("verify")
    public ResponseEntity<String> verifyUser(@Param("code") String code) {
        if (authService.verify(code)) {
            return ResponseEntity.ok("verification successful");
        } else {
            return ResponseEntity.badRequest().body("Failed to verify");
        }
    }

    @GetMapping("resend/{email}")
    public String resendEmailVerification(@PathVariable("email") String email,
                                        HttpServletRequest request) throws UnsupportedEncodingException, MessagingException {
        return authService.resendVerificationEmail(email, getSiteURL(request));
    }

    private String getSiteURL(HttpServletRequest request) {
        String siteURL = request.getRequestURL().toString();
        return siteURL.replace(request.getServletPath(), "");
    }
}
