package com.example.homeworkapp.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

import com.example.homeworkapp.dto.UserDto;
import com.example.homeworkapp.service.UserService;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;


@Controller
public class UserController {
    
    @Autowired
    private UserService userService;
    
    @GetMapping("/registration")
    public String getRegistrationPage(@ModelAttribute("user") UserDto userDto) {
        return "register";
    }
    
    @PostMapping("/registration")
    public String saveUser(@ModelAttribute("user") UserDto userDto,
                           RedirectAttributes redirectAttributes) {

        userService.save(userDto);

        redirectAttributes.addFlashAttribute("message",

        "Welcome,"+ userDto.getFullname()+"! Your library membership has been created");

        return "redirect:/registration";
    }
}