package com.example.springbootmongodb.respository;

import com.example.springbootmongodb.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User, String> {

    public User findByEmail(String email);
    User findByVerificationCode(String code);
}
