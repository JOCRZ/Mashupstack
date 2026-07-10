package com.example.StreamBE_App.Controller;

import com.example.StreamBE_App.Models.Movies;
import com.example.StreamBE_App.Repository.MovieRepository;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/movies")
public class MovieController {

    @Autowired
    private MovieRepository movieRepository;

    @Autowired
    private HttpServletRequest request;

    private String resolveImage(Movies movie) {
        if (movie == null || movie.getImage() == null) return null;
        if (movie.getImage().startsWith("http")) return movie.getImage();
        String base = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort();
        return base + "/thumbnails/" + movie.getImage().replace("thumbnails/", "");
    }

    @GetMapping
    public List<Movies> getAllMovies() {
        List<Movies> movies = movieRepository.findAll();
        movies.forEach(m -> m.setImage(resolveImage(m)));
        return movies;
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Movies> getMovieById(@PathVariable Long id) {
        return movieRepository.findById(id)
                .map(m -> { m.setImage(resolveImage(m)); return ResponseEntity.ok(m); })
                .orElse(ResponseEntity.notFound().build());
    }
    
    
    @GetMapping("/search")
    public List<Movies> searchMovies(@RequestParam String title) {
        List<Movies> movies = movieRepository.findByTitleContainingIgnoreCase(title);
        movies.forEach(m -> m.setImage(resolveImage(m)));
        return movies;
    }


  
}