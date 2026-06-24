package com.example.StreamBE_App.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.StreamBE_App.Models.WatchList;
import java.util.List;
import java.util.Optional;

public interface WatchListRepository extends JpaRepository<WatchList, Long> {
    List<WatchList> findByUserId(Long userId);
    Optional<WatchList> findByUserIdAndMovieId(Long userId, Long movieId);
}
