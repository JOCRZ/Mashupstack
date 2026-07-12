package com.example.StreamBE_App.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.example.StreamBE_App.Models.MovieViews;
import com.example.StreamBE_App.dto.MovieViewStatsDTO;

public interface MovieViewsRepository extends JpaRepository<MovieViews, Long> {

    Optional<MovieViews> findTopByMovieIdAndUserIdOrderByViewedAtDesc(Long movieId, Long userId);

    @Query("SELECT COUNT(mv) FROM MovieViews mv WHERE mv.movieId = :movieId")
    long countByMovieId(@Param("movieId") Long movieId);

    @Query("SELECT COUNT(mv) FROM MovieViews mv WHERE mv.movieId = :movieId AND mv.userId = :userId")
    long countByMovieIdAndUserId(@Param("movieId") Long movieId, @Param("userId") Long userId);

    @Query("SELECT COUNT(mv) FROM MovieViews mv")
    long countTotalViews();

    @Query("SELECT new com.example.StreamBE_App.dto.MovieViewStatsDTO(mv.movieId, m.title, COUNT(mv), COUNT(DISTINCT mv.userId)) " +
           "FROM MovieViews mv JOIN Movies m ON mv.movieId = m.id " +
           "GROUP BY mv.movieId, m.title ORDER BY COUNT(mv) DESC")
    List<MovieViewStatsDTO> getMovieViewStats();
}
