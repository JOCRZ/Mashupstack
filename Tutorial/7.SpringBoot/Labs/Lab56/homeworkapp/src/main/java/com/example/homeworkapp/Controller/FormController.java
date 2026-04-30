package com.example.homeworkapp.Controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.validation.BindingResult;
import jakarta.validation.Valid;
import com.example.homeworkapp.UserDetails;


@Controller
public class FormController {

	@GetMapping("/form")
	public String showForm(Model model) {
	    model.addAttribute("userDetails", new UserDetails());
	    return "userdetails";
	}


	@PostMapping("/submit")
	public String submitForm(
	        @Valid @ModelAttribute UserDetails userDetails,
	        BindingResult result,
	        Model model
	) {
	    if (result.hasErrors()) {
	        return "userdetails";
	    }
	    model.addAttribute("userDetails", userDetails);
	    return "success";
	}
}