package com.example.Myapp.Repository;

import org.springframework.data.repository.CrudRepository;
import com.example.Myapp.Models.ProductModel;

public interface ProductRepository extends CrudRepository<ProductModel,Integer> {

}