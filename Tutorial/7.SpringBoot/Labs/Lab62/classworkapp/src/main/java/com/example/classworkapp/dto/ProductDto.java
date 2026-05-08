package com.example.classworkapp.dto;

public class ProductDto {

    private String name;
    private String description;
    private String price;
    private String expirydate;
    private String category;
    private String stock;

    // Constructor
    public ProductDto(String name, String description, String price,
                      String expirydate, String category, String stock) {

        this.name = name;
        this.description = description;
        this.price = price;
        this.expirydate = expirydate;
        this.category = category;
        this.stock = stock;
    }

    // Getters and Setters

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getExpirydate() {
        return expirydate;
    }

    public void setExpirydate(String expirydate) {
        this.expirydate = expirydate;
    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getStock() {
        return stock;
    }

    public void setStock(String stock) {
        this.stock = stock;
    }
}