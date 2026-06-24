package com.example.StreamBE_App.Controller;

import com.example.StreamBE_App.Models.Movies;
import com.example.StreamBE_App.Repository.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/movies")
public class MovieController {

    @Autowired
    private MovieRepository movieRepository;

    @GetMapping
    public List<Movies> getAllMovies() {
        return movieRepository.findAll();
    }

  
}