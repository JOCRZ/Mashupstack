package com.example.homeworkapp.Repository;

import org.springframework.data.repository.CrudRepository;
import com.example.homeworkapp.Models.BooksModel;

public interface BooksRepository extends CrudRepository<BooksModel,Integer> {

}