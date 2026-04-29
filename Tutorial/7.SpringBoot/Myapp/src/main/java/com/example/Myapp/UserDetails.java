package com.example.Myapp;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public class UserDetails {

    @NotBlank(message = "Name is required")
    public String name;
    
    @Email(message = "Email address is not valid")
    @NotBlank(message = "Email address is required")
    public String email;
    
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
}