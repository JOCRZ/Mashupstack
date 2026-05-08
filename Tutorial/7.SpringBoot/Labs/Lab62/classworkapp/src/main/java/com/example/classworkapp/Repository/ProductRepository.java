package com.example.classworkapp.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.example.classworkapp.Models.Products;
import java.util.List;


public interface ProductRepository extends JpaRepository<Products, Integer> {
    @Query("SELECT p FROM Products p WHERE p.name LIKE %:keyword% OR p.description LIKE %:keyword%")
    List<Products> findAllByKeyword(@Param("keyword") String keyword);
}




