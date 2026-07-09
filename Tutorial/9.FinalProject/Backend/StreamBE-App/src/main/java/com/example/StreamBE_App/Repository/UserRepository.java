package com.example.StreamBE_App.Repository;

import java.util.List;
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

    @Query("SELECT COUNT(u) FROM User u WHERE u.role = :role")
    long countByRole(@Param("role") boolean role);

    @Query("SELECT COUNT(u) FROM User u WHERE u.role = false AND u.block_status = :status")
    long countByBlockStatusForUsers(@Param("status") boolean status);

    @Query("SELECT u FROM User u WHERE " +
           "(:search IS NULL OR LOWER(u.name) LIKE LOWER(CONCAT('%', :search, '%')) OR LOWER(u.email) LIKE LOWER(CONCAT('%', :search, '%'))) AND " +
           "(:role IS NULL OR u.role = :role) AND " +
           "(:blockStatus IS NULL OR u.block_status = :blockStatus)")
    List<User> findByFilters(@Param("search") String search,
                             @Param("role") Boolean role,
                             @Param("blockStatus") Boolean blockStatus);
}