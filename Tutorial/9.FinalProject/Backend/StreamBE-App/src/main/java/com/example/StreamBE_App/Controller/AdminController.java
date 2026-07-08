package com.example.StreamBE_App.Controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import com.example.StreamBE_App.Models.Movies;
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
            if (user.isBlock_status()) {
                return "redirect:/blocked";
            }
            request.getSession().setAttribute("adminUser", email);
            return "redirect:/dashboard";
        }
        return "redirect:/login?error";
    }

    @GetMapping("/blocked")
    public String blockedPage() {
        return "blocked";
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
    public String usersPage(@RequestParam(required = false) String search,
                            @RequestParam(required = false) String role,
                            @RequestParam(required = false) String blockStatus,
                            Model model) {
        if (search != null && search.isEmpty()) search = null;

        Boolean roleFilter = null;
        if (role != null && !role.isEmpty()) {
            roleFilter = "admin".equalsIgnoreCase(role);
        }

        Boolean blockFilter = null;
        if (blockStatus != null && !blockStatus.isEmpty()) {
            blockFilter = "blocked".equalsIgnoreCase(blockStatus);
        }

        List<User> users;
        if (search != null || roleFilter != null || blockFilter != null) {
            users = userRepository.findByFilters(search, roleFilter, blockFilter);
        } else {
            users = userRepository.findAll();
        }

        model.addAttribute("users", users);
        model.addAttribute("selectedSearch", search);
        model.addAttribute("selectedRole", role);
        model.addAttribute("selectedBlockStatus", blockStatus);
        return "users";
    }

    @PostMapping("/users/block")
    public String blockUser(@RequestParam Long userId) {
        User user = userRepository.findById(userId).orElse(null);
        if (user != null) {
            user.setBlock_status(!user.isBlock_status());
            userRepository.save(user);
        }
        return "redirect:/users";
    }

    @PostMapping("/users/delete")
    public String deleteUser(@RequestParam Long userId) {
        userRepository.deleteById(userId);
        return "redirect:/users";
    }
    
    @GetMapping("/files")
    public String filesPage(@RequestParam(required = false) String search,
                            @RequestParam(required = false) String language,
                            @RequestParam(required = false) List<Integer> year,
                            Model model) {
        if (search != null && search.isEmpty()) search = null;
        if (language != null && language.isEmpty()) language = null;

        List<Movies> movies;
        if (search != null || language != null || (year != null && !year.isEmpty())) {
            movies = movieRepository.findByFilters(search, language, year);
        } else {
            movies = movieRepository.findAll();
        }
        model.addAttribute("movies", movies);
        model.addAttribute("selectedSearch", search);
        model.addAttribute("selectedLanguage", language);
        model.addAttribute("selectedYears", year);
        return "files";
    }

    @PostMapping("/files/delete")
    public String deleteMovie(@RequestParam Long movieId) {
        movieRepository.deleteById(movieId);
        return "redirect:/files";
    }
    
    @GetMapping("/upload")
    public String uploadPage() {
        return "edit";
    }
    
    @GetMapping("/view")
    public String viewPage(@RequestParam(required = false) Long userId, Model model) {
        if (userId != null) {
            User user = userRepository.findById(userId).orElse(null);
            model.addAttribute("viewUser", user);
        }
        return "view";
    }
    
    @GetMapping("/preview")
    public String previewPage(@RequestParam(required = false) Long movieId, Model model) {
        if (movieId != null) {
            Movies movie = movieRepository.findById(movieId).orElse(null);
            model.addAttribute("previewMovie", movie);
        }
        return "preview";
    }
}