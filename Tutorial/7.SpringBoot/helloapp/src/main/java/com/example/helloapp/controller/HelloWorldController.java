package com.example.helloapp.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.stereotype.Controller;
@Controller
public class HelloWorldController {

    @GetMapping("/hello")
    public String hello() {
        return "HelloWorld";
    }
}