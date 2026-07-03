package com.example.StreamBE_App.dto;

import java.time.LocalDateTime;

public class HistoryWithMovieDTO {
    private Long id;
    private Long movieId;
    private String title;
    private int year;
    private LocalDateTime watchedAt;

    public HistoryWithMovieDTO() {}

    public HistoryWithMovieDTO(Long id, Long movieId, String title, int year, LocalDateTime watchedAt) {
        this.id = id;
        this.movieId = movieId;
        this.title = title;
        this.year = year;
        this.watchedAt = watchedAt;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getMovieId() { return movieId; }
    public void setMovieId(Long movieId) { this.movieId = movieId; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public int getYear() { return year; }
    public void setYear(int year) { this.year = year; }

    public LocalDateTime getWatchedAt() { return watchedAt; }
    public void setWatchedAt(LocalDateTime watchedAt) { this.watchedAt = watchedAt; }
}
