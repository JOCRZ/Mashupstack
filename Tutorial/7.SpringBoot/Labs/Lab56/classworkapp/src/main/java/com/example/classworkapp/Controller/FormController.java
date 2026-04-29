package com.example.classworkapp.Controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class FormController {
	@GetMapping("/form")
	public String processForm() {
	    return "form";
	}
    
    @GetMapping("/submit")
    public String submitForm(
        @RequestParam String name,
        Model model
    ) {
        model.addAttribute("username", name);
        return "welcome";
    }
}