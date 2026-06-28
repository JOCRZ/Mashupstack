package com.example.StreamBE_App.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.StreamBE_App.Models.WatchHistory;
import java.util.List;

public interface WatchHistoryRepository extends JpaRepository<WatchHistory, Long> {
    List<WatchHistory> findByUserIdOrderByWatchedAtDesc(Long userId);
    WatchHistory findByUserIdAndMovieId(Long userId, Long movieId);
    void deleteByUserIdAndMovieId(Long userId, Long movieId);
}
