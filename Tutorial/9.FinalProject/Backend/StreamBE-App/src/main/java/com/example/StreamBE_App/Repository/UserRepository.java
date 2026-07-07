package com.example.StreamBE_App.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.example.StreamBE_App.Models.User;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
    User findByToken(String token);
    boolean existsByToken(String token);

    @Query("SELECT COUNT(u) FROM User u WHERE u.block_status = :status")
    long countByBlockStatus(@Param("status") boolean status);
}