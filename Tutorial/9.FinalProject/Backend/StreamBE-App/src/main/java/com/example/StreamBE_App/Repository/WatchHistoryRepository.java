package com.example.StreamBE_App.Repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.example.StreamBE_App.Models.WatchHistory;
import com.example.StreamBE_App.dto.HistoryWithMovieDTO;

public interface WatchHistoryRepository extends JpaRepository<WatchHistory, Long> {
    List<WatchHistory> findByUserIdOrderByWatchedAtDesc(Long userId);
    WatchHistory findByUserIdAndMovieId(Long userId, Long movieId);
    void deleteByUserIdAndMovieId(Long userId, Long movieId);

    @Query("SELECT new com.example.StreamBE_App.dto.HistoryWithMovieDTO(h.id, m.id, m.title, m.year, m.rating, m.language, m.image, h.watchedAt) " +
           "FROM WatchHistory h JOIN Movies m ON h.movieId = m.id " +
           "WHERE h.userId = :userId ORDER BY h.watchedAt DESC")
    List<HistoryWithMovieDTO> findHistoryWithMovie(@Param("userId") Long userId);
}
