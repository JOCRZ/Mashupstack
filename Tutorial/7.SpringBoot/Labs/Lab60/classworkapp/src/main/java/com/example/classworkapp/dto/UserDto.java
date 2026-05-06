package com.example.classworkapp.dto;

public class UserDto {
   
    private String mob;
    private String password;
    private String fullname;
    private String email;

    // ✅ DEFAULT CONSTRUCTOR (REQUIRED)
    public UserDto() {
    }

    // Parameterized constructor
    public UserDto(String mob, String password, String fullname, String email) {
        this.mob = mob;
        this.password = password;
        this.fullname = fullname;
        this.email = email;
    }

    // Getters & Setters
    public String getMob() {
        return mob;
    }

    public void setMob(String mob) {
        this.mob = mob;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getFullname() {
        return fullname;
    }

    public void setFullname(String fullname) {
        this.fullname = fullname;
    }
    
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}