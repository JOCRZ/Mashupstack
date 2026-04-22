package com.example.Myapp.Controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ResponseBody;
@Controller
public class MyappController {
	
	@GetMapping("/home")
    public String home() {
        return "redirect:/welcome";
    } // redirecting
	
    @GetMapping("/welcome")
    public String hello() {
        return "Welcome";
    }
    
    @GetMapping("/get")
    @ResponseBody
    public String hai() {
        return "Hello, world!";
    }
}