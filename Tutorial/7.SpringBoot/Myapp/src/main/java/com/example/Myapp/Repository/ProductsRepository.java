package com.example.Myapp.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.example.Myapp.Models.Products;
import java.util.List;

public interface ProductsRepository extends JpaRepository<Products, Integer> {
    @Query("SELECT p FROM Products p WHERE p.name LIKE %:keyword% OR p.description LIKE %:keyword%")
    List<Products> findAllByKeyword(@Param("keyword") String keyword);
}