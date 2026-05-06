package com.example.classworkapp.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.classworkapp.dto.UserDto;
import com.example.classworkapp.Models.User;
import com.example.classworkapp.Repository.UserRepository;

@Service
public class UserService{
   
    @Autowired
    private PasswordEncoder passwordEncoder;
   
    @Autowired
    private UserRepository userRepository;

    public User save(UserDto userDto) {
        User user = new User(userDto.getMob(), passwordEncoder.encode(userDto.getPassword()) , userDto.getFullname(), userDto.getEmail());
        return userRepository.save(user);
    }
}