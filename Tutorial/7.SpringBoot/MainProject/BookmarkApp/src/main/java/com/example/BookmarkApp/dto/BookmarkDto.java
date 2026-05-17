package com.example.BookmarkApp.dto;

import java.time.LocalDateTime;

public class BookmarkDto {

    private String title;

    private String url;

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

    // =========================
    // GETTERS & SETTERS
    // =========================

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