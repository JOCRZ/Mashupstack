package com.example.BookmarkApp.Controllers;

import org.springframework.beans.factory.annotation.Autowired;


import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

import com.example.BookmarkApp.dto.UserDto;
import com.example.BookmarkApp.Services.UserService;

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
    
  
    
    @GetMapping("/pricing")
    public String pricing() {
        return "pricing";
    }
    
    @GetMapping("/about")
    public String about() {
        return "about";
    }
}