package com.example.classworkapp.Controller;

import org.springframework.web.bind.annotation.GetMapping;
import com.example.classworkapp.Models.Products;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import java.util.List;
import java.util.ArrayList;

@Controller
public class ClassworkController {

	 @GetMapping("/products")
	    public String getProducts(Model model) {
	        List<Products> products = new ArrayList<>();
	        products.add(new Products(101, "Sugar",(float) 55.5));
	        products.add(new Products(102, "Salt",(float) 20.0));
	        products.add(new Products(102, "Wheat Flour",(float) 38.75));
	        model.addAttribute("products", products);
	        return "products";
	    }
}