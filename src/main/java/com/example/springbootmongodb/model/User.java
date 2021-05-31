package com.example.springbootmongodb.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Document("users")
public class User {

    @Id
    private String id;

    @NotNull
    @Size(min = 2, max = 255, message = "Email field must be between {min} and {max} characters long")
    @Email
    @Indexed(unique = true)
    private String email;

    @NotNull
    @Size(min = 6, max = 255, message = "Password field must be between {min} and {max} characters long")
    private String password;
    private String roles;
    private String verificationCode;
    private boolean enabled;

    public User(String id, String email, String password) {
        this.id = id;
        this.email = email;
        this.password = password;
    }

    public List<String> getRoleList() {
        if(this.roles.length() > 0) {
            return Arrays.asList(this.roles.split(","));
        }

        return new ArrayList<>();
    }
}
