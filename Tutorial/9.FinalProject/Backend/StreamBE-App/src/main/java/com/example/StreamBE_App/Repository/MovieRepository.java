package com.example.StreamBE_App.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.StreamBE_App.Models.Movies;
import java.util.List;

public interface MovieRepository extends JpaRepository<Movies, Long> {
    List<Movies> findByTitleContainingIgnoreCase(String title);
}