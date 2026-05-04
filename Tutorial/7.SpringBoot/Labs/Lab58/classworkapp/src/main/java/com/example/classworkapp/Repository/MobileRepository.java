package com.example.classworkapp.Repository;

import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import com.example.classworkapp.Models.MobileModel;

public interface MobileRepository extends CrudRepository<MobileModel,Integer> {

    // 1. All phones (name + price)
    @Query("SELECT p.name, p.price FROM MobileModel p ORDER BY p.price DESC")
    List<Object[]> getAllPhones();

    // 2. Phones less than 20000
    @Query("SELECT p.name, p.price FROM MobileModel p WHERE p.price < 20000")
    List<Object[]> getBudgetPhones();

    // 3. Count grouped by brand
    @Query("SELECT p.brand, COUNT(p) FROM MobileModel p GROUP BY p.brand")
    List<Object[]> countByBrand();
}
