package com.example.classworkapp.Controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
@Controller
public class ClassworkController {

    @GetMapping("/home")
    public String home() {
        return "redirect:/welcome";
    }

    @GetMapping("/welcome")
    public String hello(Model model) {
        String msg1 = "The beautiful thing about learning is that no one can take it away from you.";
        model.addAttribute("msg1", msg1);
        
        String msg2 = " <h1>Hello from Spring Boot!</h1> ";
        model.addAttribute("msg2", msg2);
        
        boolean isLoggedIn = true;
        model.addAttribute("isLoggedIn", isLoggedIn);
        
        return "welcome";
    }
}