package com.example.homeworkapp.Controller;

import org.springframework.web.bind.annotation.GetMapping;
import com.example.homeworkapp.Models.Books;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;

@Controller
public class PdfController {

	@GetMapping("/library")
    public String getLibrary(Model model) {
        List<Books> booksList = new ArrayList<>();

        booksList.add(new Books(1, "Biscuit", 45.3f, "Alyssa Satin Capucilli", "A puppy adventure", "1996-05-01"));
        booksList.add(new Books(2, "Java Basics", 59.99f, "James Gosling", "Learn Java from scratch", "2023-11-15"));
        booksList.add(new Books(3, "Spring Boot in Action", 75.50f, "Craig Walls", "Build robust APIs", "2022-03-20"));

        model.addAttribute("books", booksList);
        
        return "library"; 
    }
}