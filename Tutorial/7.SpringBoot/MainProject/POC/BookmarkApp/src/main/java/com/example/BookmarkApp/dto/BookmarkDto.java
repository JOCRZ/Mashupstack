package com.example.BookmarkApp.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

import java.time.LocalDateTime;

public class BookmarkDto {

    @NotBlank(message = "Title is required")
    @Size(max = 255, message = "Title cannot exceed 255 characters")
    private String title;

    @NotBlank(message = "URL is required")

    @Pattern(
        regexp = "^(http|https)://.*$",
        message = "URL must start with http:// or https://"
    )
    private String url;

    @Size(max = 255, message = "Display URL too long")
    private String displayUrl;

    private LocalDateTime addedTime;

    public BookmarkDto() {
    }

    public BookmarkDto(String title,
                       String url,
                       String displayUrl,
                       LocalDateTime addedTime) {

        this.title = title;
        this.url = url;
        this.displayUrl = displayUrl;
        this.addedTime = addedTime;
    }

 // Getters & Setters

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getDisplayUrl() {
        return displayUrl;
    }

    public void setDisplayUrl(String displayUrl) {
        this.displayUrl = displayUrl;
    }

    public LocalDateTime getAddedTime() {
        return addedTime;
    }

    public void setAddedTime(LocalDateTime addedTime) {
        this.addedTime = addedTime;
    }
}