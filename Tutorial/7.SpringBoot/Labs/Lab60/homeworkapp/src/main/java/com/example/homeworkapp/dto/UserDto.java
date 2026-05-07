package com.example.homeworkapp.dto;

public class UserDto {
   
    private String email;
    private String password;
    private String fullname;
    private String address;
    private String dob;
   
    public UserDto(String email, String password, String fullname, String address, String dob) {
        super();
        this.email = email;
        this.password = password;
        this.fullname = fullname;
        this.address = address;
        this.dob = dob;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
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
    
    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }
   
    public String getDob() {
        return dob;
    }

    public void setDob(String dob) {
        this.dob = dob;
    }
}