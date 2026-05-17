package com.example.BookmarkApp.Models;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(
    name = "users",
    uniqueConstraints = @UniqueConstraint(columnNames = "email")
)

public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String email;
    private String password;

    // ONE USER -> MANY BOOKMARKS
    @OneToMany(mappedBy = "user",
               cascade = CascadeType.ALL)

    private List<Bookmarks> bookmarks;

    public User() {
        super();
    }

    public User(String email, String password) {
        this.email = email;
        this.password = password;

    }

    // Getters & Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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
    
    public List<Bookmarks> getBookmarks() {
        return bookmarks;
    }

    public void setBookmarks(List<Bookmarks> bookmarks) {
        this.bookmarks = bookmarks;
    }
}