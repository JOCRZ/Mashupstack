package com.example.Myapp.Controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.validation.BindingResult;
import jakarta.validation.Valid;
import com.example.Myapp.UserDetails;


@Controller
public class FormController {
	// section for get
    @GetMapping("/formget")
    public String processForm1(@RequestParam(required = false) String name, @RequestParam(required = false) String email, Model model) {
        model.addAttribute("name", name);
        model.addAttribute("email", email); 
        return "userdetails1";
    }
    
    
    // section for post
    @GetMapping("/formpost")
    public String processForm2(@RequestParam(required = false) String name, @RequestParam(required = false) String email, Model model) {
        model.addAttribute("name", name);
        model.addAttribute("email", email); 
        return "userdetails2";
    }
    
    @PostMapping("/submit2")
    public String handleFormSubmission(@RequestParam String name, @RequestParam String email,Model model) {
        model.addAttribute("name", name);
        model.addAttribute("email", email); 
        return "success";
    }
    
    // java validation 
    
    @GetMapping("/formjava")
    public String processForm(Model model) {
        UserDetails userDetails = new UserDetails();
        model.addAttribute("userDetails", userDetails);
        return "userdetails3";
    }

    @PostMapping("/submit3")
    public String submitForm(@Valid @ModelAttribute("userDetails3") UserDetails userDetails, BindingResult result, Model model) {
        model.addAttribute("userDetails", userDetails);
        if (result.hasErrors()) {
            return "userdetails3";
        } else {
            return "success2";
        }
    }
}