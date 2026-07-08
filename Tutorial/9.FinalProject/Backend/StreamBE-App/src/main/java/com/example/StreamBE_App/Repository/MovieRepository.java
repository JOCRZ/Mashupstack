package com.example.StreamBE_App.Repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.example.StreamBE_App.Models.Movies;
import com.example.StreamBE_App.dto.LanguageCountDTO;
import com.example.StreamBE_App.dto.YearCountDTO;

public interface MovieRepository extends JpaRepository<Movies, Long> {
    List<Movies> findByTitleContainingIgnoreCase(String title);

    @Query("SELECT new com.example.StreamBE_App.dto.LanguageCountDTO(m.language, COUNT(m)) FROM Movies m GROUP BY m.language")
    List<LanguageCountDTO> countByLanguage();

    @Query("SELECT new com.example.StreamBE_App.dto.YearCountDTO(m.year, COUNT(m)) FROM Movies m GROUP BY m.year ORDER BY m.year")
    List<YearCountDTO> countByYear();

    @Query("SELECT m FROM Movies m WHERE " +
           "(:search IS NULL OR LOWER(m.title) LIKE LOWER(CONCAT('%', :search, '%'))) AND " +
           "(:language IS NULL OR m.language = :language) AND " +
           "(:years IS NULL OR m.year IN :years)")
    List<Movies> findByFilters(@Param("search") String search,
                               @Param("language") String language,
                               @Param("years") List<Integer> years);
}