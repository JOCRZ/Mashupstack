package com.example.classworkapp.Controller;

import com.example.classworkapp.Models.Products;
import com.example.classworkapp.Repository.ProductRepository;
import com.example.classworkapp.exception.ProductNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3002")
@RequestMapping("/api")
public class ProductAPIController {

    @Autowired
    private ProductRepository productRepository;

    // CREATE

    @PostMapping("/products")
    public Products createProduct(@RequestBody Products product) {

        return productRepository.save(product);
    }

    // READ ALL

    @GetMapping("/listproduct")
    public List<Products> getAllProducts() {

        return productRepository.findAll();
    }

    // READ BY ID

    @GetMapping("/product/{id}")
    public Products getProductById(@PathVariable Integer id) {

        return productRepository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException(id));
    }

    // UPDATE

    @PutMapping("/updateproduct/{id}")
    public Products updateProduct(@RequestBody Products newProduct,
                                  @PathVariable Integer id) {

        return productRepository.findById(id)
                .map(product -> {

                    product.setName(newProduct.getName());
                    product.setDescription(newProduct.getDescription());
                    product.setPrice(newProduct.getPrice());
                    product.setExpirydate(newProduct.getExpirydate());

                    return productRepository.save(product);

                }).orElseThrow(() -> new ProductNotFoundException(id));
    }

    // DELETE

    @DeleteMapping("/deleteproduct/{id}")
    public String deleteProduct(@PathVariable Integer id) {

        if (!productRepository.existsById(id)) {

            throw new ProductNotFoundException(id);
        }

        productRepository.deleteById(id);

        return "Product with id " + id + " deleted successfully.";
    }

    // SEARCH

    @GetMapping("/search")
    public List<Products> searchProducts(@Param("keyword") String keyword) {

        return productRepository.findAllByKeyword(keyword);
    }
}