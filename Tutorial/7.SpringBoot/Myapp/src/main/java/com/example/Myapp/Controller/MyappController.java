package com.example.Myapp.Controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.ui.Model;


@Controller
public class MyappController {
	
	@GetMapping("/home")
    public String home() {
        return "redirect:/Welcome";
    } // redirecting

    
    @GetMapping("/Welcome")
    public String hello(Model model) {
        String message = "The beautiful thing about learning is that no one can take it away from you.";
        model.addAttribute("message", message);
        String hello = "<h1>Hello, World!</h1>";
        model.addAttribute("hello", hello);
        boolean isLoggedIn = true;
        model.addAttribute("isLoggedIn", isLoggedIn);
        return "Welcome";
    }
    
    @GetMapping("/get")
    @ResponseBody
    public String hai() {
        return "Hello, world!";
    }
}