package com.example.homeworkapp.Controller;

import org.springframework.web.bind.annotation.GetMapping;
import com.example.homeworkapp.Models.Students;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import java.util.List;
import java.util.ArrayList;

@Controller
public class homeworkController {

	 @GetMapping("/students")
	    public String getProducts(Model model) {
	        List<Students> students = new ArrayList<>();
	        students.add(new Students(101, "Anjali Sharma",(float) 92.5));
	        students.add(new Students(102, "Rohit Mehta",(float) 85.0));
	        students.add(new Students(102, "Sheha Iyer",(float) 78.6));
	        model.addAttribute("students", students);
	        return "students";
	    }
}