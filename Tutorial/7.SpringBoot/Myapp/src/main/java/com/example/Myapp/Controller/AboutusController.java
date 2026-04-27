package com.example.Myapp.Controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.stereotype.Controller;
@Controller
public class AboutusController {

    
    @GetMapping("/partials")
    public String aboutus() {
        return "index";
    }
}