package com.example.classworkapp.Repository;

import org.springframework.data.repository.CrudRepository;
import com.example.classworkapp.Models.ProductModels;

public interface ProductRepository extends CrudRepository<ProductModels,Integer> {

}