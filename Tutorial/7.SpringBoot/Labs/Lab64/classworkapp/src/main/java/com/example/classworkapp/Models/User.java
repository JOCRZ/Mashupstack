package com.example.classworkapp.Models;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.UniqueConstraint;
import jakarta.persistence.Table;

@Entity
@Table(name = "users", uniqueConstraints = @UniqueConstraint(columnNames = "email"))
public class User {
   
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
   
    private String first;
    private String last;
    private String mobile;
    private String email;
    private String password;
    private String token;

    public User() {
        super();
    }

    public User(String email, String password, String first, String last, String mobile) {
        this.email = email;
        this.password = password;
        this.first = first;
        this.last = last;
        this.mobile = mobile;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
    
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