package com.example.classworkapp.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.example.classworkapp.Models.SchoolModel;
import java.util.List;

public interface SchoolRepository extends JpaRepository<SchoolModel, Integer> {
	
	 @Query("SELECT p FROM SchoolModel p WHERE p.name LIKE %:keyword% OR p.standard LIKE %:keyword%")
	    List<SchoolModel> findAllByKeyword(@Param("keyword") String keyword);
}