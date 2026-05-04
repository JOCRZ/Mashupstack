package com.example.Myapp.Controller;

import com.example.Myapp.Repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import com.example.Myapp.Models.Products;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;

import java.util.List;
import java.util.ArrayList;


@Controller
public class ProductController {
	
	 @Autowired  
	    private ProductRepository productRepository;

    @GetMapping("/product")
    public String getProduct(Model model) {
        Products product = new Products(1,"Biscuit",(float) 45.3);
        model.addAttribute("product", product);
        return "product";
    }
    
    @GetMapping("/products")
    public String getProducts(Model model) {
        List<Products> products = new ArrayList<>();
        products.add(new Products(1, "Biscuit",(float) 36.7));
        products.add(new Products(2, "Chocolate",(float) 67.78));
        products.add(new Products(3, "Chips",(float) 90.89));
        model.addAttribute("products", products);
        return "products";
    }
    
    @GetMapping("/productname")
    public String productdetails(Model model) {
        List<Object[]> namesAndPricesList = productRepository.findNamesAndPrices();
        model.addAttribute("namesAndPrices", namesAndPricesList);
        return "product-name";
    }
}