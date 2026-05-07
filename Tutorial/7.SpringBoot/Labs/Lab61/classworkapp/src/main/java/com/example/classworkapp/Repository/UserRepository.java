package com.example.classworkapp.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.classworkapp.Models.User;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByMob(String mob);
}