package com.example.classworkapp.Controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.stereotype.Controller;
@Controller
public class ClassworkController {

    @GetMapping("/Myprofile")
    public String hello() {
        return "Portfolio";
    }
}