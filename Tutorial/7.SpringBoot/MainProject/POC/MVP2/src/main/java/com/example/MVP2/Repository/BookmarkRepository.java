package com.example.MVP2.Repository;

import com.example.MVP2.Models.Bookmarks;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookmarkRepository
       extends JpaRepository<Bookmarks, Long> {

}