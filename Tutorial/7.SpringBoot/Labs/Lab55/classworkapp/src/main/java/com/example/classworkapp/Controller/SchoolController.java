package com.example.classworkapp.Controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.stereotype.Controller;
@Controller
public class SchoolController {

    @GetMapping("/home")
    public String home() {
        return "home";
    }
    
    @GetMapping("/product")
    public String product() {
        return "product";
    }
}