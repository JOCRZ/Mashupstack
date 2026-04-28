package com.example.homeworkapp.Controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.stereotype.Controller;
@Controller
public class BookstoreController {

    @GetMapping("/home")
    public String home() {
        return "home";
    }
    
    @GetMapping("/books")
    public String books() {
        return "books";
    }
}