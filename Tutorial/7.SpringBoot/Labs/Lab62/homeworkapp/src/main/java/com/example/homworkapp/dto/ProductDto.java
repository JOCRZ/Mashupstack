package com.example.homworkapp.dto;

public class ProductDto {

    private String title;
    private String author;
    private String genre;
    private String price;
    private String publishedDate;
  

    // Constructor
    public ProductDto(String title, String author, String genre,
                      String price, String publishedDate) {

        this.title = title;
        this.author = author;
        this.genre = genre;
        this.price = price;
        this.publishedDate = publishedDate;
    }

    // Getters and Setters

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getGenre() {
        return genre;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }
    
    public String getDate() {
        return publishedDate;
    }

    public void setDate(String publishedDate) {
        this.publishedDate = publishedDate;
    }
}