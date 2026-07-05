package com.example.StreamBE_App.Service;

import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.example.StreamBE_App.dto.UserDto;
import com.example.StreamBE_App.Models.User;
import com.example.StreamBE_App.Repository.UserRepository;

@Service
public class UserService implements UserDetailsService {
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    private UserRepository userRepository;

    public User save(UserDto userDto) {
        User user = new User(userDto.getName(), userDto.getEmail(), passwordEncoder.encode(userDto.getPassword()));
        return userRepository.save(user);
    }

    public boolean changePassword(String email, String currentPassword, String newPassword) {
        User user = userRepository.findByEmail(email);
        if (user == null || !passwordEncoder.matches(currentPassword, user.getPassword())) {
            return false;
        }
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
        return true;
    }

    public User findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public boolean authenticate(String email, String password) {
        User user = userRepository.findByEmail(email);
        if (user == null) {
            return false;
        }
        return passwordEncoder.matches(password, user.getPassword());
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new UsernameNotFoundException("User not found with email: " + email);
        }
        return new org.springframework.security.core.userdetails.User(
            user.getEmail(), user.getPassword(), new ArrayList<>()
        );
    }
}
