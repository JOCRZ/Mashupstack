package com.example.StreamBE_App.Controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import com.example.StreamBE_App.Models.Movies;
import com.example.StreamBE_App.Models.User;
import com.example.StreamBE_App.Repository.MovieRepository;
import com.example.StreamBE_App.Repository.UserRepository;
import com.example.StreamBE_App.Repository.WatchListRepository;
import com.example.StreamBE_App.Service.TmdbService;
import com.example.StreamBE_App.dto.LanguageCountDTO;
import com.example.StreamBE_App.dto.WatchListCountDTO;
import com.example.StreamBE_App.dto.YearCountDTO;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

@Controller
public class AdminController {

    @Value("${app.upload.dir}")
    private String uploadDir;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MovieRepository movieRepository;

    @Autowired
    private WatchListRepository watchListRepository;

    @Autowired
    private TmdbService tmdbService;

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
        long totalUsers = userRepository.countByRole(false);
        long blockedUsers = userRepository.countByBlockStatusForUsers(true);
        long totalMovies = movieRepository.count();

        List<LanguageCountDTO> moviesByLanguage = movieRepository.countByLanguage();
        List<YearCountDTO> moviesByYear = movieRepository.countByYear();
        List<WatchListCountDTO> watchlistByStatus = watchListRepository.countByStatusGrouped();

        model.addAttribute("totalUsers", totalUsers);
        model.addAttribute("blockedUsers", blockedUsers);
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
        model.addAttribute("distinctYears", movieRepository.findDistinctYears());
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

    @GetMapping("/edit")
    public String editPage(@RequestParam(value = "movieId", required = false) Long movieId, Model model) {
        if (movieId == null) return "redirect:/files";
        Movies movie = movieRepository.findById(movieId).orElse(null);
        if (movie == null) return "redirect:/files";
        model.addAttribute("movie", movie);
        return "edit";
    }

    @PostMapping("/upload")
    public String doUpload(@RequestParam String title,
                           @RequestParam String description,
                           @RequestParam int year,
                           @RequestParam double rating,
                           @RequestParam String duration,
                           @RequestParam String language,
                           @RequestParam("videoName") String videoName,
                           @RequestParam("videoFile") MultipartFile videoFile,
                           @RequestParam(value = "imageUrl", required = false) String imageUrl,
                           @RequestParam(value = "image", required = false) MultipartFile image) {
        try {
            java.nio.file.Path uploadPath = java.nio.file.Paths.get(uploadDir).toAbsolutePath().normalize();
            if (!uploadPath.toFile().exists()) uploadPath.toFile().mkdirs();

            String ext = "";
            String original = videoFile.getOriginalFilename();
            if (original != null && original.contains(".")) {
                ext = original.substring(original.lastIndexOf("."));
            }
            String fileName = videoName.replaceAll("[^a-zA-Z0-9_\\-]", "_") + ext;
            java.nio.file.Path filePath = uploadPath.resolve(fileName);
            videoFile.transferTo(filePath.toFile());

            Movies movie = new Movies(title, description, year, duration, rating, language);
            movie.setFilePath(fileName);

            if (imageUrl != null && !imageUrl.isEmpty()) {
                movie.setImage(imageUrl);
            } else if (image != null && !image.isEmpty()) {
                java.nio.file.Path thumbDir = uploadPath.resolve("thumbnails");
                if (!thumbDir.toFile().exists()) thumbDir.toFile().mkdirs();
                String thumbName = System.currentTimeMillis() + "_" + image.getOriginalFilename();
                image.transferTo(thumbDir.resolve(thumbName).toFile());
                movie.setImage("thumbnails/" + thumbName);
            }

            movieRepository.save(movie);

            return "redirect:/files?uploadSuccess";
        } catch (Exception e) {
            return "redirect:/upload?error";
        }
    }

    @PostMapping("/update")
    public String doUpdate(@RequestParam Long movieId,
                           @RequestParam String title,
                           @RequestParam String description,
                           @RequestParam int year,
                           @RequestParam double rating,
                           @RequestParam String duration,
                           @RequestParam String language,
                           @RequestParam(value = "videoName", required = false) String videoName,
                           @RequestParam(value = "videoFile", required = false) MultipartFile videoFile,
                           @RequestParam(value = "imageUrl", required = false) String imageUrl,
                           @RequestParam(value = "image", required = false) MultipartFile image) {
        try {
            Movies movie = movieRepository.findById(movieId).orElse(null);
            if (movie == null) return "redirect:/files?error=notfound";

            movie.setTitle(title);
            movie.setDescription(description);
            movie.setYear(year);
            movie.setRating(rating);
            movie.setDuration(duration);
            movie.setLanguage(language);

            if (videoFile != null && !videoFile.isEmpty() && videoName != null && !videoName.isEmpty()) {
                java.nio.file.Path uploadPath = java.nio.file.Paths.get(uploadDir).toAbsolutePath().normalize();
                if (!uploadPath.toFile().exists()) uploadPath.toFile().mkdirs();
                String ext = "";
                String original = videoFile.getOriginalFilename();
                if (original != null && original.contains(".")) {
                    ext = original.substring(original.lastIndexOf("."));
                }
                String fileName = videoName.replaceAll("[^a-zA-Z0-9_\\-]", "_") + ext;
                videoFile.transferTo(uploadPath.resolve(fileName).toFile());
                movie.setFilePath(fileName);
            }

            if (imageUrl != null && !imageUrl.isEmpty()) {
                movie.setImage(imageUrl);
            } else if (image != null && !image.isEmpty()) {
                java.nio.file.Path uploadPath = java.nio.file.Paths.get(uploadDir).toAbsolutePath().normalize();
                java.nio.file.Path thumbDir = uploadPath.resolve("thumbnails");
                if (!thumbDir.toFile().exists()) thumbDir.toFile().mkdirs();
                String thumbName = System.currentTimeMillis() + "_" + image.getOriginalFilename();
                image.transferTo(thumbDir.resolve(thumbName).toFile());
                movie.setImage("thumbnails/" + thumbName);
            }

            movieRepository.save(movie);
            return "redirect:/files?updateSuccess";
        } catch (Exception e) {
            return "redirect:/edit?movieId=" + movieId + "&error";
        }
    }

    @GetMapping("/videos/{id}")
    public ResponseEntity<Resource> streamVideo(@PathVariable Long id) {
        Movies movie = movieRepository.findById(id).orElse(null);
        if (movie == null || movie.getFilePath() == null) {
            return ResponseEntity.notFound().build();
        }

        java.nio.file.Path filePath = java.nio.file.Paths.get(uploadDir).toAbsolutePath().normalize().resolve(movie.getFilePath());
        if (!filePath.toFile().exists()) {
            return ResponseEntity.notFound().build();
        }

        FileSystemResource resource = new FileSystemResource(filePath.toFile());
        String contentType = "video/mp4";

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + movie.getFilePath() + "\"")
                .body(resource);
    }

    @GetMapping("/thumbnails/{filename}")
    public ResponseEntity<Resource> serveThumbnail(@PathVariable String filename) {
        try {
            java.nio.file.Path thumbDir = java.nio.file.Paths.get(uploadDir).toAbsolutePath().normalize().resolve("thumbnails");
            java.nio.file.Path filePath = thumbDir.resolve(filename).normalize();
            if (!filePath.startsWith(thumbDir) || !filePath.toFile().exists()) {
                return ResponseEntity.notFound().build();
            }
            FileSystemResource resource = new FileSystemResource(filePath.toFile());
            String contentType = "image/png";
            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(contentType))
                    .body(resource);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/fetch-movie")
    @ResponseBody
    public Map<String, Object> fetchMovie(@RequestParam String title, @RequestParam int year) {
        return tmdbService.fetchMovie(title, year);
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

    @PostMapping("/change-password")
    @ResponseBody
    public Map<String, String> doChangePassword(@RequestParam String currentPassword,
                                                 @RequestParam String newPassword,
                                                 @RequestParam String confirmPassword,
                                                 HttpSession session) {
        Map<String, String> response = new HashMap<>();
        String email = (String) session.getAttribute("adminUser");

        if (email == null) {
            response.put("error", "Not logged in");
            return response;
        }

        User user = userRepository.findByEmail(email);
        if (user == null) {
            response.put("error", "User not found");
            return response;
        }

        if (!user.getPassword().equals(currentPassword)) {
            response.put("error", "Current password is incorrect");
            return response;
        }

        if (!newPassword.equals(confirmPassword)) {
            response.put("error", "New passwords do not match");
            return response;
        }

        user.setPassword(newPassword);
        userRepository.save(user);

        response.put("success", "Password changed successfully");
        return response;
    }
}