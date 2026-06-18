package com.example.StreamBE_App.Controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.stereotype.Controller;

@Controller
public class AdminController {

    @GetMapping("/admin")
    public String login1() {
        return "login";
    }
    
    @GetMapping("/users")
    public String login2() {
        return "users";
    }
    
    @GetMapping("/files")
    public String login3() {
        return "files";
    }
    
    @GetMapping("/upload")
    public String login4() {
        return "edit";
    }
    
    @GetMapping("/view")
    public String login5() {
        return "view";
    }
    
    @GetMapping("/preview")
    public String login6() {
    	return "preview";
    }
}