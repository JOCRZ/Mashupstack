package com.example.classworkapp.dto;

public class UserDto {
   
	private String first;
    private String last;
    private String mobile;
    private String email;
    private String password;
    private String token;
  
   
    public UserDto(String email, String password, String first, String last, String mobile) {
    	super();
    	this.email = email;
        this.password = password;
        this.first = first;
        this.last = last;
        this.mobile = mobile;
       
    }

    // Getters and Setters
    
    public String getFirst() {
        return first;
    }

    public void setFirst(String first) {
        this.first = first;
    }
    
    public String getLast() {
        return last;
    }

    public void setLast(String last) {
        this.last = last;
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

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }
    
    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}