package com.example.StreamBE_App.dto;

public class WatchListDto {
    private Long id;
    private Long userId;
    private Long movieId;
    private String status;

    public WatchListDto() {}

    public WatchListDto(Long id, Long userId, Long movieId, String status) {
        this.id = id;
        this.userId = userId;
        this.movieId = movieId;
        this.status = status;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public Long getMovieId() { return movieId; }
    public void setMovieId(Long movieId) { this.movieId = movieId; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
