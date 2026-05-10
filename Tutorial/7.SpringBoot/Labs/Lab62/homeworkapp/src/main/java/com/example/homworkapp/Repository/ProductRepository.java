package com.example.homworkapp.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.example.homworkapp.Models.Products;
import java.util.List;


public interface ProductRepository extends JpaRepository<Products, Integer> {

    @Query("SELECT p FROM Products p WHERE p.title LIKE %:keyword% OR p.author LIKE %:keyword% OR p.genre LIKE %:keyword%")
    
    List<Products> findAllByKeyword(@Param("keyword") String keyword);
}



