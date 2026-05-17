package com.example.BookmarkApp.Controllers;

import com.example.BookmarkApp.Models.Bookmarks;
import com.example.BookmarkApp.Models.User;
import com.example.BookmarkApp.Repository.BookmarkRepository;
import com.example.BookmarkApp.dto.BookmarkDto;

import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;

import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Controller
public class BookmarkController {

    @Autowired
    private BookmarkRepository bookmarkRepository;

    // =========================
    // DASHBOARD
    // =========================

    @GetMapping("/dashboard")
    public String dashboard(

            @RequestParam(required = false)
            String keyword,

            HttpSession session,

            Model model) {

        // CHECK LOGIN
        User user =
                (User) session.getAttribute("loggedInUser");

        if (user == null) {
            return "redirect:/login";
        }

        List<Bookmarks> bookmarks;

        // SEARCH
        if (keyword != null && !keyword.isEmpty()) {

            bookmarks =
                    bookmarkRepository.searchBookmarks(
                            user,
                            keyword
                    );

        } else {

            bookmarks =
                    bookmarkRepository.findByUser(user);
        }

        // COUNT
        long bookmarkCount =
                bookmarkRepository.countByUser(user);

        model.addAttribute("bookmarks", bookmarks);

        model.addAttribute("bookmarkCount", bookmarkCount);

        model.addAttribute("user", user);

        model.addAttribute(
                "bookmarkDto",
                new BookmarkDto()
        );

        return "dashboard";
    }

    // =========================
    // SAVE BOOKMARK
    // =========================

    @PostMapping("/save")
    public String saveBookmark(

            @Valid @ModelAttribute("bookmarkDto")
            BookmarkDto bookmarkDto,

            BindingResult result,

            HttpSession session,

            Model model) {

        User user =
                (User) session.getAttribute("loggedInUser");

        if (user == null) {
            return "redirect:/login";
        }

        // VALIDATION ERRORS
        if (result.hasErrors()) {
            return "dashboard";
        }

        // LIMIT CHECK
        long bookmarkCount =
                bookmarkRepository.countByUser(user);

        if (bookmarkCount >= 5) {

            model.addAttribute(
                    "error",
                    "Maximum bookmark limit reached"
            );

            return "redirect:/dashboard";
        }

        // DUPLICATE URL CHECK
        boolean exists =
                bookmarkRepository.existsByUserAndUrl(
                        user,
                        bookmarkDto.getUrl()
                );

        if (exists) {

            model.addAttribute(
                    "error",
                    "Bookmark already exists"
            );

            return "redirect:/dashboard";
        }

        Bookmarks bookmark = new Bookmarks();

        bookmark.setTitle(
                bookmarkDto.getTitle()
        );

        bookmark.setUrl(
                bookmarkDto.getUrl()
        );

        bookmark.setDisplayUrl(
                bookmarkDto.getDisplayUrl()
        );

        bookmark.setAddedTime(
                LocalDateTime.now()
        );

        bookmark.setUser(user);

        bookmarkRepository.save(bookmark);

        return "redirect:/dashboard";
    }

    // =========================
    // DELETE BOOKMARK
    // =========================

    @PostMapping("/delete/{id}")
    public String deleteBookmark(

            @PathVariable Long id,

            HttpSession session) {

        User user =
                (User) session.getAttribute("loggedInUser");

        if (user == null) {
            return "redirect:/login";
        }

        Optional<Bookmarks> optionalBookmark =
                bookmarkRepository.findById(id);

        if (optionalBookmark.isEmpty()) {
            return "redirect:/dashboard";
        }

        Bookmarks bookmark =
                optionalBookmark.get();

        // OWNERSHIP CHECK
        if (!bookmark.getUser()
                .getId()
                .equals(user.getId())) {

            return "redirect:/dashboard";
        }

        bookmarkRepository.delete(bookmark);

        return "redirect:/dashboard";
    }

    // =========================
    // UPDATE BOOKMARK
    // =========================

    @PostMapping("/update/{id}")
    public String updateBookmark(

            @PathVariable Long id,

            @Valid BookmarkDto bookmarkDto,

            BindingResult result,

            HttpSession session) {

        User user =
                (User) session.getAttribute("loggedInUser");

        if (user == null) {
            return "redirect:/login";
        }

        if (result.hasErrors()) {
            return "redirect:/dashboard";
        }

        Optional<Bookmarks> optionalBookmark =
                bookmarkRepository.findById(id);

        if (optionalBookmark.isEmpty()) {
            return "redirect:/dashboard";
        }

        Bookmarks bookmark =
                optionalBookmark.get();

        // OWNERSHIP CHECK
        if (!bookmark.getUser()
                .getId()
                .equals(user.getId())) {

            return "redirect:/dashboard";
        }

        bookmark.setTitle(
                bookmarkDto.getTitle()
        );

        bookmark.setUrl(
                bookmarkDto.getUrl()
        );

        bookmark.setDisplayUrl(
                bookmarkDto.getDisplayUrl()
        );

        bookmarkRepository.save(bookmark);

        return "redirect:/dashboard";
    }
}