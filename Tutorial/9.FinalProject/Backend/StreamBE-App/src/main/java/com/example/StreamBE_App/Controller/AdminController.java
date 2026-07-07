package com.example.StreamBE_App.Controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import com.example.StreamBE_App.Models.User;
import com.example.StreamBE_App.Repository.MovieRepository;
import com.example.StreamBE_App.Repository.UserRepository;
import com.example.StreamBE_App.Repository.WatchListRepository;
import com.example.StreamBE_App.dto.LanguageCountDTO;
import com.example.StreamBE_App.dto.WatchListCountDTO;
import com.example.StreamBE_App.dto.YearCountDTO;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

@Controller
public class AdminController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MovieRepository movieRepository;

    @Autowired
    private WatchListRepository watchListRepository;

    @GetMapping({"/login", "/admin"})
    public String loginPage(HttpSession session) {
        if (session.getAttribute("adminUser") != null) {
            return "redirect:/dashboard";
        }
        return "login";
    }

    @PostMapping("/login")
    public String doLogin(@RequestParam String email, @RequestParam String password,
                          HttpServletRequest request) {
        User user = userRepository.findByEmail(email);
        if (user != null && user.getPassword().equals(password)) {
            request.getSession().setAttribute("adminUser", email);
            return "redirect:/dashboard";
        }
        return "redirect:/login?error";
    }

    @GetMapping("/logout")
    public String logout(HttpSession session) {
        session.invalidate();
        return "redirect:/admin";
    }

    @GetMapping("/dashboard")
    public String dashboard(Model model) {
        long totalUsers = userRepository.count();
        long blockedUsers = userRepository.countByBlockStatus(true);
        long totalMovies = movieRepository.count();

        List<LanguageCountDTO> moviesByLanguage = movieRepository.countByLanguage();
        List<YearCountDTO> moviesByYear = movieRepository.countByYear();
        List<WatchListCountDTO> watchlistByStatus = watchListRepository.countByStatusGrouped();

        model.addAttribute("totalUsers", totalUsers);
        model.addAttribute("blockedUsers", blockedUsers);
        model.addAttribute("activeUsers", totalUsers - blockedUsers);
        model.addAttribute("totalMovies", totalMovies);
        model.addAttribute("moviesByLanguage", moviesByLanguage);
        model.addAttribute("moviesByYear", moviesByYear);
        model.addAttribute("watchlistByStatus", watchlistByStatus);

        return "dashboard";
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