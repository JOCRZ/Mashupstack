package com.example.StreamBE_App.Controller;

import com.example.StreamBE_App.Models.User;
import com.example.StreamBE_App.Models.WatchHistory;
import com.example.StreamBE_App.Repository.UserRepository;
import com.example.StreamBE_App.Repository.WatchHistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/history")
public class WatchHistoryController {

    @Autowired
    private WatchHistoryRepository watchHistoryRepository;

    @Autowired
    private UserRepository userRepository;

    private Long getUserId(Authentication auth) {
        User user = userRepository.findByEmail(auth.getName());
        return user != null ? user.getId() : null;
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
        return ResponseEntity.ok("Logged");
    }

    @GetMapping
    public ResponseEntity<?> getHistory(Authentication auth) {
        Long userId = getUserId(auth);
        if (userId == null) return ResponseEntity.status(401).body("User not found");

        return ResponseEntity.ok(watchHistoryRepository.findHistoryWithMovie(userId));
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
