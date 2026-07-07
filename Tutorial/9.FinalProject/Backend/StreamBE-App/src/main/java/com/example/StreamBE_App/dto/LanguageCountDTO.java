package com.example.StreamBE_App.dto;

public class LanguageCountDTO {
    private String language;
    private long count;

    public LanguageCountDTO() {}

    public LanguageCountDTO(String language, long count) {
        this.language = language;
        this.count = count;
    }

    public String getLanguage() { return language; }
    public void setLanguage(String language) { this.language = language; }

    public long getCount() { return count; }
    public void setCount(long count) { this.count = count; }
}
