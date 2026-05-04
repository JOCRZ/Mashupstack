package com.example.classworkapp.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import com.example.classworkapp.Repository.MobileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import com.example.classworkapp.Models.MobileModel; 
import java.util.List;


@Controller
public class MobileController {

	@GetMapping("/mobilentry")
	public String Books(Model model) {
	    model.addAttribute("message", "Enter Your Mobile Details");
	    return "mobilentry";
	}
	@Autowired
	private MobileRepository mobileRepository;
	@PostMapping("/mobilesave")
	public String Mobile(MobileModel mobileData,Model model) {
	    
	    MobileModel n = new MobileModel();
	    n.setName(mobileData.getName());
	    n.setBrand(mobileData.getBrand());    
	    n.setPrice(mobileData.getPrice()); 
	    mobileRepository.save(n);
	    
	    model.addAttribute("message", "The Mobile detail " + mobileData.getName() +" is saved successfully");
	    return "mobilentry"; 
	} 
	
	
	@GetMapping("/mobileview")
    public String productdetails(Model model) {

        // 1. All phones (name + price)
        List<Object[]> allPhones = mobileRepository.getAllPhones();

        // 2. Phones below 20000
        List<Object[]> budgetPhones = mobileRepository.getBudgetPhones();

        // 3. Count grouped by brand
        List<Object[]> brandCount = mobileRepository.countByBrand();

        // Send data 
        model.addAttribute("allPhones", allPhones);
        model.addAttribute("budgetPhones", budgetPhones);
        model.addAttribute("brandCount", brandCount);

        return "mobileview";
    }

}