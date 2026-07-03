package com.example.StreamBE_App.Repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.example.StreamBE_App.Models.WatchList;
import com.example.StreamBE_App.dto.WatchListWithMovieDTO;

public interface WatchListRepository extends JpaRepository<WatchList, Long> {
    List<WatchList> findByUserId(Long userId);
    Optional<WatchList> findByUserIdAndMovieId(Long userId, Long movieId);

    @Query("SELECT new com.example.StreamBE_App.dto.WatchListWithMovieDTO(w.id, m.id, m.title, m.year, w.status) " +
           "FROM WatchList w JOIN Movies m ON w.movieId = m.id " +
           "WHERE w.userId = :userId ORDER BY w.id DESC")
    List<WatchListWithMovieDTO> findWatchListWithMovie(@Param("userId") Long userId);
}
