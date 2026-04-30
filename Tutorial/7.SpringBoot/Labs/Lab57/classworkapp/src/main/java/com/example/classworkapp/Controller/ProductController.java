package com.example.classworkapp.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import com.example.classworkapp.Repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import com.example.classworkapp.Models.ProductModels; 
@Controller
public class ProductController {

	@GetMapping("/productentry")
	public String Product(Model model) {
	    model.addAttribute("message", "Enter Your product Details");
	    return "product";
	}
	@Autowired
	private ProductRepository productRepository;
	@PostMapping("/save-product")
	public String Product(ProductModels productData,Model model) {
	    
	    ProductModels n = new ProductModels();
	    n.setName(productData.getName());
	    n.setDescription(productData.getDescription());    
	    n.setPrice(productData.getPrice()); 
	    productRepository.save(n);
	    
	    model.addAttribute("message", "The product " + productData.getName() +" is saved successfully");
	    return "product"; 
	} 
	
	@GetMapping("/productsview")
	public String showProducts(Model model) {
		 Iterable<ProductModels> productList = productRepository.findAll();
	    model.addAttribute("products", productList);
	    return "products";
	}

}