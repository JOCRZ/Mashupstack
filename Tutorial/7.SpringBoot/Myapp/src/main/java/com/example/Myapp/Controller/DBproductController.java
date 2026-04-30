package com.example.Myapp.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import com.example.Myapp.Repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import com.example.Myapp.Models.ProductModel; 
@Controller
public class DBproductController {

	@GetMapping("/productdb")
	public String Product(Model model) {
	    model.addAttribute("message", "Enter Your product Details");
	    return "DBproduct";
	}
	@Autowired
	private ProductRepository productRepository;
	@PostMapping("/save-product")
	public String Product(ProductModel productData,Model model) {
	    
	    ProductModel n = new ProductModel();
	    n.setName(productData.getName());
	    n.setDescription(productData.getDescription());    
	    n.setPrice(productData.getPrice()); 
	    productRepository.save(n);
	    
	    model.addAttribute("message", "The product " + productData.getName() +" is saved successfully");
	    return "DBproduct"; 
	} 
	
	@GetMapping("/productsview")
	public String showProducts(Model model) {
		 Iterable<ProductModel> productList = productRepository.findAll();
	    model.addAttribute("products", productList);
	    return "productview";
	}

}