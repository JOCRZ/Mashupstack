package com.example.homeworkapp.Controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.stereotype.Controller;
@Controller
public class HomeworkController {

    @GetMapping("/Myphotos")
    public String hello() {
        return "albums";
    }
}