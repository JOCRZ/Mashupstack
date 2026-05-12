package com.example.homeworkapp.Controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.homeworkapp.Models.User;
import com.example.homeworkapp.dto.UserDto;
import com.example.homeworkapp.security.TokenGenerator;
import com.example.homeworkapp.service.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api")
public class UserAPIController {

    @Autowired
    private UserService userService;

    @Autowired
    private TokenGenerator tokenGenerator;

    @PostMapping("/register")
    public ResponseEntity<?> register(
            @Valid @RequestBody UserDto userDto) {

        userService.save(userDto);

        return ResponseEntity.ok("User registered successfully");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {

        String token = tokenGenerator.generateToken(
                user.getEmail(),
                user.getPassword());

        if (token != null) {
            return ResponseEntity.ok(Map.of("token", token));
        }

        return ResponseEntity.status(401)
                .body("Invalid credentials");
    }

    @PostMapping("/logout")
    public String logout(
            @RequestHeader("Authorization") String authHeader) {

        if (authHeader != null &&
                authHeader.startsWith("Bearer ")) {

            String token = authHeader.substring(7);

            tokenGenerator.invalidateToken(token);

            return "Logout successful";
        }

        return "Invalid token";
    }
}