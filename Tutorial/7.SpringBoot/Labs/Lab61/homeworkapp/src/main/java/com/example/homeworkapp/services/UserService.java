package com.example.homeworkapp.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.homeworkapp.dto.UserDto;
import com.example.homeworkapp.Models.User;
import com.example.homeworkapp.Repository.UserRepository;

@Service
public class UserService{
   
    @Autowired
    private PasswordEncoder passwordEncoder;
   
    @Autowired
    private UserRepository userRepository;

    public User save(UserDto userDto) {
        User user = new User(userDto.getEmail(), passwordEncoder.encode(userDto.getPassword()) , userDto.getFirstname(), userDto.getLastname(), userDto.getAddress());
        return userRepository.save(user);
    }
}