package com.example.homeworkapp;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public class UserDetails {

    @NotBlank(message = "Name is required")
    private String name;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    @GmailOnly
    private String email;

    @Address(message = "Your address must contain India.")
    private String address;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }
}