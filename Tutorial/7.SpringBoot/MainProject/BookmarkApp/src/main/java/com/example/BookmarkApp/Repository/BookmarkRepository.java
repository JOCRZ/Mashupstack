package com.example.BookmarkApp.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.BookmarkApp.Models.Bookmarks;
import com.example.BookmarkApp.Models.User;

public interface BookmarkRepository
        extends JpaRepository<Bookmarks, Long> {

    // GET USER BOOKMARKS
    List<Bookmarks> findByUser(User user);

    // COUNT USER BOOKMARKS
    long countByUser(User user);

    // CHECK DUPLICATE
    boolean existsByUserAndUrl(
            User user,
            String url
    );

    // SEARCH BOOKMARKS
    @Query("""
        SELECT b FROM Bookmarks b
        WHERE b.user = :user
        AND (
            LOWER(b.title)
            LIKE LOWER(CONCAT('%', :keyword, '%'))

            OR

            LOWER(b.url)
            LIKE LOWER(CONCAT('%', :keyword, '%'))
        )
    """)
    List<Bookmarks> searchBookmarks(

            @Param("user")
            User user,

            @Param("keyword")
            String keyword
    );
}