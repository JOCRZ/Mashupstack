package com.example.BookmarkApp.Repository;

import com.example.BookmarkApp.Models.Bookmarks;
import com.example.BookmarkApp.Models.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BookmarkRepository
        extends JpaRepository<Bookmarks, Long> {

    // =========================
    // GET ALL BOOKMARKS OF USER
    // =========================

    List<Bookmarks> findByUser(User user);


    // =========================
    // COUNT USER BOOKMARKS
    // =========================

    long countByUser(User user);


    // =========================
    // CHECK DUPLICATE URL
    // =========================

    boolean existsByUserAndUrl(
            User user,
            String url
    );


    // =========================
    // SEARCH USER BOOKMARKS
    // =========================

    @Query("""
        SELECT b FROM Bookmarks b
        WHERE b.user = :user
        AND (
            LOWER(b.title) LIKE LOWER(CONCAT('%', :keyword, '%'))
            OR
            LOWER(b.url) LIKE LOWER(CONCAT('%', :keyword, '%'))
        )
    """)
    List<Bookmarks> searchBookmarks(

            @Param("user") User user,

            @Param("keyword") String keyword
    );
}