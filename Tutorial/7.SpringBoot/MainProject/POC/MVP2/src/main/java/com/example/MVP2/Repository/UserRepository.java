package com.example.MVP2.Repository;
import org.springframework.data.jpa.repository.JpaRepository;


import com.example.MVP2.Models.User;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
}