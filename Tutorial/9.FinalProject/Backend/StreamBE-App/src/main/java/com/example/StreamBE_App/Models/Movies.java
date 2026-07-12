package com.example.StreamBE_App.Models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;

@Entity
@Table(name = "movies")
public class Movies {
   
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
   
    private String title;
    @Lob
    private String description;
    private int year;
    private String duration;
    private double rating;
    private String language;
    private String filePath;
    private String image;
    private int views;

    public Movies() {}

    public Movies(String title, String description, int year, String duration, double rating, String language) {
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

    public String getFilePath() { return filePath; }
    public void setFilePath(String filePath) { this.filePath = filePath; }

    public String getImage() { return image; }
    public void setImage(String image) { this.image = image; }

    public int getViews() { return views; }
    public void setViews(int views) { this.views = views; }
}
