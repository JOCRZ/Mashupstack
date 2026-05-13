package com.example.homeworkapp.Models;

public class Books {
    private int id;
    private String title;
    private float price;
    private String author;
    private String description;
    private String publisheDate;
    
    public Books(int id, String title, float price, String author, String description, String publisheDate) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.author = author;
        this.description = description;
        this.publisheDate = publisheDate;
    }
    // getters & setters
    
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }
    public float getPrice() {
        return price;
    }
    public void setPrice(float price) {
        this.price = price;
    }
    
    public String getAuthor() {
        return author;
    }
    public void setAuthor(String author) {
        this.author = author;
    }
    
    public String getDesc() {
        return description;
    }
    public void setDesc(String description) {
        this.description = description;
    }
    
    public String getPdate() {
        return publisheDate;
    }
    public void setPdate(String publisheDate) {
        this.publisheDate = publisheDate;
    }
    
    
}