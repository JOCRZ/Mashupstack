package com.example.homework.Controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.stereotype.Controller;
@Controller
public class HomeworkController {

    @GetMapping("/music")
    public String hello() {
        return "HelloConcert";
    }
}