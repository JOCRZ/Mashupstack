package com.example.classwork.Controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.stereotype.Controller;
@Controller
public class ClassworkController {

    @GetMapping("/student")
    public String hello() {
        return "HelloStudent";
    }
}