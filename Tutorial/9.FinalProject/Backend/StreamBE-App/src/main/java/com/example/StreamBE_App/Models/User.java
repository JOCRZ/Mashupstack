package com.example.StreamBE_App.Models;


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
   
    private Integer user_id;
    private String name;
    private String email;
    private String password;
    private boolean role;
    private boolean block_status;

    public User() {
        super();
    }

    public User(String name, String email, String password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }

    public User(Integer user_id, String name, String email, String password, boolean role, boolean block_status) {
        this.user_id = user_id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
        this.block_status = block_status;
    }

    // Getters and Setters
    public Integer getId() {
        return user_id;
    }

    public void setId(Integer user_id) {
        this.user_id = user_id;
    }
    
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


    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public boolean getRole() {
        return role;
    }

    public void setRole(boolean role) {
        this.role = role;
    }
    
    public boolean getBstatus() {
        return block_status;
    }

    public void setBstatus(boolean block_status) {
        this.block_status = block_status;
    }
    
   /*
    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
    */

}