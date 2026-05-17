package com.example.BookmarkApp.Repository;
import org.springframework.data.jpa.repository.JpaRepository;


import com.example.BookmarkApp.Models.User;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
}