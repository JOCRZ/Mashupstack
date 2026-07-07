package com.example.StreamBE_App.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import com.example.StreamBE_App.Models.User;
import com.example.StreamBE_App.Repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

@Controller
public class AdminController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping({"/login", "/admin"})
    public String loginPage(HttpSession session) {
        if (session.getAttribute("adminUser") != null) {
            return "redirect:/create";
        }
        return "login";
    }

    @PostMapping("/login")
    public String doLogin(@RequestParam String email, @RequestParam String password,
                          HttpServletRequest request) {
        User user = userRepository.findByEmail(email);
        if (user != null && user.getPassword().equals(password)) {
            request.getSession().setAttribute("adminUser", email);
            return "redirect:/create";
        }
        return "redirect:/login?error";
    }

    @GetMapping("/logout")
    public String logout(HttpSession session) {
        session.invalidate();
        return "redirect:/admin";
    }

    @GetMapping("/create")
    public String createPage() {
        return "edit";
    }
    
    @GetMapping("/users")
    public String usersPage() {
        return "users";
    }
    
    @GetMapping("/files")
    public String filesPage() {
        return "files";
    }
    
    @GetMapping("/upload")
    public String uploadPage() {
        return "edit";
    }
    
    @GetMapping("/view")
    public String viewPage() {
        return "view";
    }
    
    @GetMapping("/preview")
    public String previewPage() {
    	return "preview";
    }
}