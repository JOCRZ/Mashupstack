package com.example.Myapp.Controller;

import com.example.Myapp.Models.Products;
import com.example.Myapp.Repository.ProductsRepository;
import com.example.Myapp.exception.ProductNotFoundException;
import org.springframework.data.repository.query.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;


@RestController
@CrossOrigin("http://localhost:3002")
public class ProductAPIController {

    @Autowired
    private ProductsRepository productRepository;


    @PostMapping("api/addproduct")
    Products newProduct(@RequestBody Products newProduct) {
        return productRepository.save(newProduct);
    }
    
    
//read
@GetMapping("api/listproduct")
        List<Products> getAllProducts() {
            return productRepository.findAll();
        }


@GetMapping("api/product/{id}")
Products getProductById(@PathVariable Integer id) {
      return productRepository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException(id));
    }

// update

@PutMapping("api/updateproduct/{id}")
Products updateProduct(@RequestBody Products newProduct, @PathVariable Integer id) {
    return productRepository.findById(id)
            .map(product -> {
                product.setName(newProduct.getName());
                product.setDescription(newProduct.getDescription());
                product.setPrice(newProduct.getPrice());
                product.setExpirydate(newProduct.getExpirydate());
                return productRepository.save(product);
            }).orElseThrow(() -> new ProductNotFoundException(id));
}

// delete

@DeleteMapping("api/deleteproduct/{id}")
String deleteProduct(@PathVariable Integer id){
    if(!productRepository.existsById(id)){
        throw new ProductNotFoundException(id);
    }
    productRepository.deleteById(id);
    return  "Product with id "+id+" has been deleted successfully.";
}

// search 

@GetMapping("api/search")
List<Products> searchProducts(@Param("keyword") String keyword) {
    return productRepository.findAllByKeyword(keyword);
}

}