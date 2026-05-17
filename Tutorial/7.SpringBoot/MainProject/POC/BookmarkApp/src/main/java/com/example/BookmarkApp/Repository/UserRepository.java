package com.example.BookmarkApp.Repository;

import com.example.BookmarkApp.Models.User;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository
        extends JpaRepository<User, Long> {


  //  find user by email 
	
    User findByEmail(String email);

 
 // to check if email exits or not 
    
    boolean existsByEmail(String email);

}