package com.example.StreamBE_App.Controller;

import com.example.StreamBE_App.Models.User;
import com.example.StreamBE_App.Models.WatchList;
import com.example.StreamBE_App.Repository.UserRepository;
import com.example.StreamBE_App.Repository.WatchListRepository;
import com.example.StreamBE_App.dto.WatchListWithMovieDTO;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/watchlist")
public class WatchListController {

    @Autowired
    private WatchListRepository watchListRepository;

    @Autowired
    private UserRepository userRepository;

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
    public ResponseEntity<?> addToWatchList(@PathVariable Long movieId,
            @RequestParam(defaultValue = "PLAN_TO_WATCH") String status,
            Authentication auth) {
        Long userId = getUserId(auth);
        if (userId == null) return ResponseEntity.status(401).body("User not found");

        if (watchListRepository.findByUserIdAndMovieId(userId, movieId).isPresent()) {
            return ResponseEntity.badRequest().body("Movie already in watchlist");
        }

        WatchList entry = new WatchList(userId, movieId, status);
        watchListRepository.save(entry);
        return ResponseEntity.ok("Added to watchlist");
    }

    @GetMapping
    public ResponseEntity<?> getWatchList(Authentication auth) {
        Long userId = getUserId(auth);
        if (userId == null) return ResponseEntity.status(401).body("User not found");

        List<WatchListWithMovieDTO> list = watchListRepository.findWatchListWithMovie(userId);
        list.forEach(w -> w.setImage(resolveImage(w.getImage())));
        return ResponseEntity.ok(list);
    }

    @GetMapping("/counts")
    public ResponseEntity<?> getCounts(Authentication auth) {
        Long userId = getUserId(auth);
        if (userId == null) return ResponseEntity.status(401).body("User not found");

        return ResponseEntity.ok(watchListRepository.countByStatus(userId));
    }

    @PutMapping("/{movieId}")
    public ResponseEntity<?> updateStatus(@PathVariable Long movieId,
            @RequestParam String status, Authentication auth) {
        Long userId = getUserId(auth);
        if (userId == null) return ResponseEntity.status(401).body("User not found");

        WatchList entry = watchListRepository.findByUserIdAndMovieId(userId, movieId)
                .orElse(null);
        if (entry == null) return ResponseEntity.badRequest().body("Movie not in watchlist");

        entry.setStatus(status);
        watchListRepository.save(entry);
        return ResponseEntity.ok("Status updated");
    }

    @DeleteMapping("/{movieId}")
    public ResponseEntity<?> removeFromWatchList(@PathVariable Long movieId,
            Authentication auth) {
        Long userId = getUserId(auth);
        if (userId == null) return ResponseEntity.status(401).body("User not found");

        WatchList entry = watchListRepository.findByUserIdAndMovieId(userId, movieId)
                .orElse(null);
        if (entry == null) return ResponseEntity.badRequest().body("Movie not in watchlist");

        watchListRepository.delete(entry);
        return ResponseEntity.ok("Removed from watchlist");
    }
}
