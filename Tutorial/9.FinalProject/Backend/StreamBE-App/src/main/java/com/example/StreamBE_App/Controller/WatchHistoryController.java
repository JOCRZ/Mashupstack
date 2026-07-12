package com.example.StreamBE_App.Controller;

import com.example.StreamBE_App.Models.MovieViews;
import com.example.StreamBE_App.Models.Movies;
import com.example.StreamBE_App.Models.User;
import com.example.StreamBE_App.Models.WatchHistory;
import com.example.StreamBE_App.Repository.MovieRepository;
import com.example.StreamBE_App.Repository.MovieViewsRepository;
import com.example.StreamBE_App.Repository.UserRepository;
import com.example.StreamBE_App.Repository.WatchHistoryRepository;
import com.example.StreamBE_App.dto.HistoryWithMovieDTO;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/history")
public class WatchHistoryController {

    @Autowired
    private WatchHistoryRepository watchHistoryRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MovieRepository movieRepository;

    @Autowired
    private MovieViewsRepository movieViewsRepository;

    @Autowired
    private HttpServletRequest request;

    private Long getUserId(Authentication auth) {
        User user = userRepository.findByEmail(auth.getName());
        return user != null ? user.getId() : null;
    }

    private String resolveImage(String image) {
        if (image == null) return null;
        if (image.startsWith("http")) return image;
        String base = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort();
        return base + "/thumbnails/" + image.replace("thumbnails/", "");
    }

    @PostMapping("/{movieId}")
    public ResponseEntity<?> logWatch(@PathVariable Long movieId, Authentication auth) {
        Long userId = getUserId(auth);
        if (userId == null) return ResponseEntity.status(401).body("User not found");

        WatchHistory existing = watchHistoryRepository.findByUserIdAndMovieId(userId, movieId);
        if (existing != null) {
            existing.setWatchedAt(LocalDateTime.now());
            watchHistoryRepository.save(existing);
        } else {
            watchHistoryRepository.save(new WatchHistory(userId, movieId));
        }

        Optional<MovieViews> lastView = movieViewsRepository.findTopByMovieIdAndUserIdOrderByViewedAtDesc(movieId, userId);
        boolean shouldCount = true;
        if (lastView.isPresent()) {
            LocalDateTime last = lastView.get().getViewedAt();
            if (last.plusHours(24).isAfter(LocalDateTime.now())) {
                shouldCount = false;
            }
        }
        if (shouldCount) {
            movieViewsRepository.save(new MovieViews(movieId, userId));
            movieRepository.findById(movieId).ifPresent(m -> {
                m.setViews(m.getViews() + 1);
                movieRepository.save(m);
            });
        }

        return ResponseEntity.ok("Logged");
    }

    @GetMapping
    public ResponseEntity<?> getHistory(Authentication auth) {
        Long userId = getUserId(auth);
        if (userId == null) return ResponseEntity.status(401).body("User not found");

        List<HistoryWithMovieDTO> history = watchHistoryRepository.findHistoryWithMovie(userId);
        history.forEach(h -> h.setImage(resolveImage(h.getImage())));
        return ResponseEntity.ok(history);
    }

    @Transactional
    @DeleteMapping("/{movieId}")
    public ResponseEntity<?> removeHistory(@PathVariable Long movieId, Authentication auth) {
        Long userId = getUserId(auth);
        if (userId == null) return ResponseEntity.status(401).body("User not found");

        watchHistoryRepository.deleteByUserIdAndMovieId(userId, movieId);
        return ResponseEntity.ok("Removed from history");
    }
}
