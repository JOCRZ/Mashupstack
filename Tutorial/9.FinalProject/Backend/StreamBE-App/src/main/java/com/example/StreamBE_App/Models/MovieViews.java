package com.example.StreamBE_App.Models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.LocalDateTime;

@Entity
@Table(name = "movie_views")
public class MovieViews {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private Long movieId;
    private Long userId;
    private LocalDateTime viewedAt;

    public MovieViews() {}

    public MovieViews(Long movieId, Long userId) {
        this.movieId = movieId;
        this.userId = userId;
        this.viewedAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getMovieId() { return movieId; }
    public void setMovieId(Long movieId) { this.movieId = movieId; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public LocalDateTime getViewedAt() { return viewedAt; }
    public void setViewedAt(LocalDateTime viewedAt) { this.viewedAt = viewedAt; }
}
