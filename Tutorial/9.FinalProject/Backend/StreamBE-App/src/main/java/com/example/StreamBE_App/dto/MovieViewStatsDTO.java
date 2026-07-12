package com.example.StreamBE_App.dto;

public class MovieViewStatsDTO {
    private Long movieId;
    private String title;
    private long views;
    private long uniqueViewers;

    public MovieViewStatsDTO() {}

    public MovieViewStatsDTO(Long movieId, String title, long views, long uniqueViewers) {
        this.movieId = movieId;
        this.title = title;
        this.views = views;
        this.uniqueViewers = uniqueViewers;
    }

    public Long getMovieId() { return movieId; }
    public void setMovieId(Long movieId) { this.movieId = movieId; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public long getViews() { return views; }
    public void setViews(long views) { this.views = views; }

    public long getUniqueViewers() { return uniqueViewers; }
    public void setUniqueViewers(long uniqueViewers) { this.uniqueViewers = uniqueViewers; }
}
