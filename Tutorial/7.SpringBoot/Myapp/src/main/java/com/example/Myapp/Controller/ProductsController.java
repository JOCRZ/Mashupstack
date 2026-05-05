package com.example.Myapp.Controller;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.data.repository.query.Param;
import com.example.Myapp.Models.Products;
import com.example.Myapp.Repository.ProductsRepository;

@Controller
public class ProductsController {

    @Autowired
    private ProductsRepository productRepository;

    @GetMapping("/create")
    public String createAction(Model model) {
        model.addAttribute("message", "Enter The Product Details");
        return "crudproduct";
    }

    @PostMapping("/create")
    public String createActionProcess(Products productData, Model model) {
        productRepository.save(productData);
        model.addAttribute("message", "The Product " + productData.getName() + " has been created successfully");
        return "crudproduct";
    }

    @GetMapping("/all")
    public String getAllProducts(Model model, @Param("keyword") String keyword) {
        List<Products> products;
        if (keyword != null && !keyword.isEmpty()) {
            products = productRepository.findAllByKeyword(keyword);
        } else {
            products = productRepository.findAll();
        }
        model.addAttribute("products", products);
        return "list";
    }
    
    // update
    @GetMapping("/update/{id}")
    public String updateProduct(@PathVariable Integer id, Model model) {
        Optional<Products> optionalProductDetails = productRepository.findById(id);
        if (optionalProductDetails.isPresent()) {
            model.addAttribute("productDetails", optionalProductDetails.get());
            return "update";
        }
        return "redirect:/all"; // Handle not found case
    }

    @PostMapping("/update/{id}")
    public String updateProduct(@PathVariable Integer id, Products productData) {
        Optional<Products> optionalProductDetails = productRepository.findById(id);
        if (optionalProductDetails.isPresent()) {
            Products productDetails = optionalProductDetails.get();
            productDetails.setName(productData.getName());
            productDetails.setDescription(productData.getDescription());
            productDetails.setExpirydate(productData.getExpirydate());
             productDetails.setPrice(productData.getPrice());
            productRepository.save(productDetails);
        }
        return "redirect:/all";
    }
    
    // delete 
    
    @GetMapping("/delete/{id}")
    public String deleteProduct(@PathVariable Integer id, Model model) {
        Optional<Products> optionalProductDetails = productRepository.findById(id);
        if (optionalProductDetails.isPresent()) {
            model.addAttribute("productDetails", optionalProductDetails.get());
            return "delete";
        }
        return "redirect:/all"; // Handle not found case
    }

    @PostMapping("/delete/{id}")
    public String deleteProduct(@PathVariable Integer id) {
        productRepository.deleteById(id);
        return "redirect:/all";
    }
}