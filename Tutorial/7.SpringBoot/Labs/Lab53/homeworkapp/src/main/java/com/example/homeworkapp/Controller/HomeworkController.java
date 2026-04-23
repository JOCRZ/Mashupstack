package com.example.homeworkapp.Controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
@Controller
public class HomeworkController {

    @GetMapping("/home")
    public String home() {
        return "redirect:/movie";
    }

    @GetMapping("/movie")
    public String hello(Model model) {
        String msg1 = "2026  Fantasy , Action <br> Avatar Aang, the world's last Airbender, learns of an ancient power that could save his culture from extinction.";
        model.addAttribute("msg1", msg1);
        
        boolean isLoggedIn = false;
        model.addAttribute("isLoggedIn", isLoggedIn);
        
        return "movie";
    }
}