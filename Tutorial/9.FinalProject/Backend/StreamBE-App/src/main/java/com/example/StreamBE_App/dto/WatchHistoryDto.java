package com.example.StreamBE_App.dto;

import java.time.LocalDateTime;

public class WatchHistoryDto {
    private Long id;
    private Long userId;
    private Long movieId;
    private LocalDateTime watchedAt;

    public WatchHistoryDto() {}

    public WatchHistoryDto(Long id, Long userId, Long movieId, LocalDateTime watchedAt) {
        this.id = id;
        this.userId = userId;
        this.movieId = movieId;
        this.watchedAt = watchedAt;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public Long getMovieId() { return movieId; }
    public void setMovieId(Long movieId) { this.movieId = movieId; }

    public LocalDateTime getWatchedAt() { return watchedAt; }
    public void setWatchedAt(LocalDateTime watchedAt) { this.watchedAt = watchedAt; }
}
