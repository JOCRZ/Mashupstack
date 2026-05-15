package com.example.MVP2.service;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.MVP2.dto.UserDto;
import com.example.MVP2.Models.User;
import com.example.MVP2.Repository.UserRepository;

@Service
public class UserService{
   
    @Autowired
    private PasswordEncoder passwordEncoder;
   
    @Autowired
    private UserRepository userRepository;

    public User save(UserDto userDto) {
        User user = new User(userDto.getEmail(), passwordEncoder.encode(userDto.getPassword()));
        return userRepository.save(user);
    }
}