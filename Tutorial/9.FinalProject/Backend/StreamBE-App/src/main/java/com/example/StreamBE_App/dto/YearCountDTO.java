package com.example.StreamBE_App.dto;

public class YearCountDTO {
    private int year;
    private long count;

    public YearCountDTO() {}

    public YearCountDTO(int year, long count) {
        this.year = year;
        this.count = count;
    }

    public int getYear() { return year; }
    public void setYear(int year) { this.year = year; }

    public long getCount() { return count; }
    public void setCount(long count) { this.count = count; }
}
