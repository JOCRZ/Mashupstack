package com.example.StreamBE_App.dto;

public class MoviesDto {
    private Long id;
    private String title;
    private String description;
    private int year;
    private String duration;
    private double rating;
    private String language;

    public MoviesDto() {}

    public MoviesDto(Long id, String title, String description, int year, String duration, double rating, String language) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.year = year;
        this.duration = duration;
        this.rating = rating;
        this.language = language;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public int getYear() { return year; }
    public void setYear(int year) { this.year = year; }

    public String getDuration() { return duration; }
    public void setDuration(String duration) { this.duration = duration; }

    public double getRating() { return rating; }
    public void setRating(double rating) { this.rating = rating; }

    public String getLanguage() { return language; }
    public void setLanguage(String language) { this.language = language; }
}
