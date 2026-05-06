package com.example.classworkapp.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

import com.example.classworkapp.dto.UserDto;
import com.example.classworkapp.Service.UserService;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Controller
public class UserController {
    
    @Autowired
    private UserService userService;
    
    @GetMapping("/registration")
    public String getRegistrationPage(Model model) {
        model.addAttribute("user", new UserDto()); 
        return "register";
    }
    
    @PostMapping("/registration")
    public String saveUser(@ModelAttribute("user") UserDto userDto,
                           RedirectAttributes redirectAttributes) {

        userService.save(userDto);

        redirectAttributes.addFlashAttribute("message",

        "Thanks for registering,"+ userDto.getFullname()+"! You can now apply for jobs.");

        return "redirect:/registration";
    }
}