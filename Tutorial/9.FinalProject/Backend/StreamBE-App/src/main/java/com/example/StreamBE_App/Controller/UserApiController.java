package com.example.StreamBE_App.Controller;

import java.util.Map;
import com.example.StreamBE_App.dto.ChangePasswordDto;
import com.example.StreamBE_App.dto.ProfileDto;
import com.example.StreamBE_App.dto.UserDto;
import com.example.StreamBE_App.Models.User;
import com.example.StreamBE_App.Service.UserService;
import com.example.StreamBE_App.security.TokenGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class UserApiController {

    @Autowired
    private UserService userService;

    @Autowired
    private TokenGenerator tokenGenerator;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody UserDto userDto) {
        userService.save(userDto);
        return ResponseEntity.ok("User registered successfully");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserDto userDto) {
        User user = userService.findByEmail(userDto.getEmail());
        if (user != null && user.isBlock_status()) {
            return ResponseEntity.status(403).body("Account is blocked");
        }
        String token = tokenGenerator.generateToken(userDto.getEmail(), userDto.getPassword());
        if (token != null) {
            return ResponseEntity.ok(Map.of("token", token));
        }
        return ResponseEntity.status(401).body("Invalid credentials");
    }
    
    @GetMapping("/profile")
    public ResponseEntity<?> getProfile(Authentication auth) {
        User user = userService.findByEmail(auth.getName());
        if (user == null) return ResponseEntity.status(401).body("User not found");
        return ResponseEntity.ok(new ProfileDto(user.getName(), user.getEmail()));
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(@RequestHeader("Authorization") String authHeader) {
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            tokenGenerator.invalidateToken(token);
            return ResponseEntity.ok("Logout successful");
        }
        return ResponseEntity.badRequest().body("Invalid token");
    }

    @PostMapping("/change-password")
    public ResponseEntity<?> changePassword(@RequestBody ChangePasswordDto dto, Authentication auth) {
        boolean success = userService.changePassword(auth.getName(), dto.getCurrentPassword(), dto.getNewPassword());
        if (success) {
            return ResponseEntity.ok("Password changed successfully");
        }
        return ResponseEntity.badRequest().body("Current password is incorrect");
    }
}
