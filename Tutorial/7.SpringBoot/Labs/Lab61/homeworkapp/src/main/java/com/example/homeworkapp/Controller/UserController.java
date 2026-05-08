package com.example.homeworkapp.Controller;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

import com.example.homeworkapp.dto.UserDto;
import com.example.homeworkapp.services.UserService;
import org.springframework.security.core.Authentication;
import com.example.homeworkapp.services.CustomUserDetail;

@Controller
public class UserController {
    
    @Autowired
    private UserService userService;
    
    @GetMapping("/registration")
    public String getRegistrationPage(@ModelAttribute("user") UserDto userDto) {
        return "register";
    }
    
    @PostMapping("/registration")
    public String saveUser(@ModelAttribute("user") UserDto userDto, Model model) {
        userService.save(userDto);
        model.addAttribute("message", "Registered Successfuly!");
        return "register";
    }
    
    @GetMapping("/login")
    public String login() {
        return "login";
    }
    
    @GetMapping("/welcome")
    public String welcomePage(Model model,
                              Authentication authentication) {

        CustomUserDetail userDetails =
                (CustomUserDetail) authentication.getPrincipal();

        model.addAttribute("username",
                userDetails.getFirstname());

        return "welcome";
    }
}