package com.example.classworkapp.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import com.example.classworkapp.Models.SchoolModel;
import org.springframework.data.repository.query.Param;
import com.example.classworkapp.Repository.SchoolRepository;
import java.util.List;
import org.springframework.web.bind.annotation.PathVariable;
import java.util.Optional;

@Controller
public class SchoolController {

    @Autowired
    private SchoolRepository schoolRepository;

    // to create  [C]
    
    @GetMapping("/create")
    public String createAction(Model model) {
        model.addAttribute("message", "Enter Student Details");
        return "create";
    }

    @PostMapping("/create")
    public String createActionProcess(SchoolModel schoolData, Model model) {
        schoolRepository.save(schoolData);
        model.addAttribute("message", "The Student " + schoolData.getName() + " has been created successfully");
        return "create";
    }
    
    // to read [R]
    
    @GetMapping("/all")
    public String getAllProducts(Model model, @Param("keyword") String keyword) {
        List<SchoolModel> students;
        if (keyword != null && !keyword.isEmpty()) {
            students = schoolRepository.findAllByKeyword(keyword);
        } else {
            students = schoolRepository.findAll();
        }
        model.addAttribute("students", students);
        return "read";
    }
    
    // to update [U]
    
    @GetMapping("/update/{id}")
    public String updateStudent(@PathVariable Integer id, Model model) {
        Optional<SchoolModel> optionalStudentDetails = schoolRepository.findById(id);
        if (optionalStudentDetails.isPresent()) {
            model.addAttribute("studentDetails", optionalStudentDetails.get());
            return "update";
        }
        return "redirect:/all"; // Handle not found case
    }

    @PostMapping("/update/{id}")
    public String updateStudent(@PathVariable Integer id, SchoolModel studentData) {
        Optional<SchoolModel> optionalStudentDetails = schoolRepository.findById(id);
        if (optionalStudentDetails.isPresent()) {
            SchoolModel studentDetails = optionalStudentDetails.get();
            studentDetails.setName(studentData.getName());
            studentDetails.setStandard(studentData.getStandard());
            studentDetails.setAge(studentData.getAge());
            schoolRepository.save(studentDetails);
        }
        return "redirect:/all";
    }
    
    // to delete [D]
    
    @GetMapping("/delete/{id}")
    public String deleteStudent(@PathVariable Integer id, Model model) {
        Optional<SchoolModel> optionalStudentDetails = schoolRepository.findById(id);
        if (optionalStudentDetails.isPresent()) {
            model.addAttribute("studentDetails", optionalStudentDetails.get());
            return "delete";
        }
        return "redirect:/all"; // Handle not found case
    }

    @PostMapping("/delete/{id}")
    public String deleteProduct(@PathVariable Integer id) {
        schoolRepository.deleteById(id);
        return "redirect:/all";
    }
    
    
}