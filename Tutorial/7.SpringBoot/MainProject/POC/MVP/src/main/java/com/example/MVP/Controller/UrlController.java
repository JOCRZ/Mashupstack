package com.example.MVP.Controller;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Controller;

import org.springframework.ui.Model;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.example.MVP.Model.UrlModel;
import com.example.MVP.service.UrlNameExtractor;

@Controller
public class UrlController {

    @Autowired
    private UrlNameExtractor service;

    @GetMapping("/")
    public String home() {

        return "index";
    }

    @PostMapping("/extract")
    public String extract(
            @RequestParam("url") String url,
            Model model) {

    	UrlModel preview =
                service.extractPreview(url);

        model.addAttribute(
                "preview",
                preview);

        return "index";
    }
}