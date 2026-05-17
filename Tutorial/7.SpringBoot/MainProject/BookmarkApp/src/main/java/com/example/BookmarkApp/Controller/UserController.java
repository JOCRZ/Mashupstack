package com.example.BookmarkApp.Controller;

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
        return "auth/register";
    }
    
    @PostMapping("/registration")
    public String saveUser(@ModelAttribute("user") UserDto userDto, Model model) {
        try {
            userService.save(userDto);
            model.addAttribute("message", "Registered successfully!");
        } catch (RuntimeException e) {
            model.addAttribute("errorMsg", e.getMessage());
        }
        return "auth/register";
    }
    
    @GetMapping("/login")
    public String login() {
        return "auth/login";
    }
    
    @GetMapping("/welcome")
    public String welcomePage() {
        return "redirect:/bookmarks";   // just forward to the real dashboard
    }
    
    @GetMapping("/pricing")
    public String pricing() {
        return "public/pricing";
    }
    
    @GetMapping("/about")
    public String about() {
        return "public/about";
    }
    @GetMapping("/test-error")
    public String testError() {
        throw new RuntimeException("This is a test exception!");
    }
}