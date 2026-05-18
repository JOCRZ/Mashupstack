package com.example.BookmarkApp.Controller;

import java.time.LocalDateTime;

import java.util.List;
import java.util.Optional;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.security.core.Authentication;

import org.springframework.stereotype.Controller;

import org.springframework.ui.Model;

import org.springframework.web.bind.annotation.*;

import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.example.BookmarkApp.Models.Bookmarks;
import com.example.BookmarkApp.Models.User;

import com.example.BookmarkApp.Repository.BookmarkRepository;
import com.example.BookmarkApp.Repository.UserRepository;

import com.example.BookmarkApp.dto.BookmarkDto;

import com.example.BookmarkApp.Services.URLinfoExtractor;

@Controller
@RequestMapping("/bookmarks")
public class BookmarksController {

    @Autowired
    private BookmarkRepository bookmarkRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private URLinfoExtractor urlinfoExtractor;

    // =====================================
    // DASHBOARD
    // =====================================

    @GetMapping
    public String dashboard(

            Authentication authentication,

            Model model,

            @RequestParam(required = false)
            String keyword) {

        // GET LOGGED-IN USER
        String email =
                authentication.getName();

        User user =
                userRepository.findByEmail(email);
        
        String username = email.substring(0, email.indexOf('@'));
        String displayName = Character.toUpperCase(username.charAt(0))
                + username.substring(1);

        List<Bookmarks> bookmarks;

        // SEARCH
        if (keyword != null &&
                !keyword.isBlank()) {

            bookmarks =
                    bookmarkRepository
                    .searchBookmarks(
                            user,
                            keyword
                    );

        } else {

            bookmarks =
                    bookmarkRepository
                    .findByUser(user);
        }

        // TOTAL COUNT
        long totalCount =
                bookmarkRepository
                .countByUser(user);

        // MODEL
        model.addAttribute(
                "bookmarks",
                bookmarks
        );

        model.addAttribute(
                "totalCount",
                totalCount
        );

        model.addAttribute(
                "keyword",
                keyword
        );
        
        model.addAttribute("useremail", email);
        model.addAttribute("username", displayName);

        return "bookmarks/dashboard";
    }

    // =====================================
    // URL PREVIEW
    // =====================================

    @PostMapping("/preview")
    @ResponseBody
    public Bookmarks previewBookmark(

            @RequestBody BookmarkDto dto) {

        return urlinfoExtractor
                .extractPreview(dto.getUrl());
    }

    // =====================================
    // SAVE BOOKMARK
    // =====================================

    @PostMapping("/save")
    public String saveBookmark(

            @Valid BookmarkDto dto,

            Authentication authentication,

            RedirectAttributes redirectAttributes) {

        // GET USER
        String email =
                authentication.getName();

        User user =
                userRepository.findByEmail(email);

        // LIMIT CHECK
        long count =
                bookmarkRepository
                .countByUser(user);

        if (count >= 5) {

            // FIXED: use RedirectAttributes so the message
            // survives the redirect (Model does not)
            redirectAttributes.addFlashAttribute(
                    "errorMsg",
                    "Maximum 5 bookmarks allowed"
            );

            return "redirect:/bookmarks";
        }

        // DUPLICATE CHECK
        boolean exists =
                bookmarkRepository
                .existsByUserAndUrl(
                        user,
                        dto.getUrl()
                );

        if (exists) {

            // FIXED: use RedirectAttributes so the message
            // survives the redirect (Model does not)
            redirectAttributes.addFlashAttribute(
                    "errorMsg",
                    "Bookmark already exists"
            );

            return "redirect:/bookmarks";
        }

        // CREATE BOOKMARK
        Bookmarks bookmark =
                new Bookmarks();

        bookmark.setTitle(
                dto.getTitle()
        );

        bookmark.setUrl(
                dto.getUrl()
        );

        bookmark.setDisplayUrl(
                dto.getDisplayUrl()
        );

        bookmark.setAddedTime(
                LocalDateTime.now()
        );

        bookmark.setUser(user);

        bookmarkRepository.save(bookmark);

        redirectAttributes.addFlashAttribute(
                "successMsg",
                "Bookmark saved successfully!"
        );

        return "redirect:/bookmarks";
    }

    // =====================================
    // UPDATE BOOKMARK
    // =====================================

    @PostMapping("/update/{id}")
    public String updateBookmark(

            @PathVariable Long id,

            @Valid BookmarkDto dto,

            Authentication authentication,

            RedirectAttributes redirectAttributes) {

        // GET USER
        String email =
                authentication.getName();

        User user =
                userRepository.findByEmail(email);

        // FIND BOOKMARK
        Optional<Bookmarks> optionalBookmark =
                bookmarkRepository.findById(id);

        // NOT FOUND
        if (optionalBookmark.isEmpty()) {

            redirectAttributes.addFlashAttribute(
                    "errorMsg",
                    "Bookmark not found"
            );

            return "redirect:/bookmarks";
        }

        Bookmarks bookmark =
                optionalBookmark.get();

        // SECURITY CHECK
        if (!bookmark.getUser()
                .getId()
                .equals(user.getId())) {

            redirectAttributes.addFlashAttribute(
                    "errorMsg",
                    "Unauthorized action"
            );

            return "redirect:/bookmarks";
        }

        // UPDATE
        bookmark.setTitle(
                dto.getTitle()
        );

        bookmark.setUrl(
                dto.getUrl()
        );

        bookmark.setDisplayUrl(
                dto.getDisplayUrl()
        );

        bookmarkRepository.save(bookmark);

        redirectAttributes.addFlashAttribute(
                "successMsg",
                "Bookmark updated successfully!"
        );

        return "redirect:/bookmarks";
    }

    // =====================================
    // DELETE BOOKMARK
    // =====================================

    @PostMapping("/delete/{id}")
    public String deleteBookmark(

            @PathVariable Long id,

            Authentication authentication,

            RedirectAttributes redirectAttributes) {

        // GET USER
        String email =
                authentication.getName();

        User user =
                userRepository.findByEmail(email);

        // FIND BOOKMARK
        Optional<Bookmarks> optionalBookmark =
                bookmarkRepository.findById(id);

        // NOT FOUND
        if (optionalBookmark.isEmpty()) {

            redirectAttributes.addFlashAttribute(
                    "errorMsg",
                    "Bookmark not found"
            );

            return "redirect:/bookmarks";
        }

        Bookmarks bookmark =
                optionalBookmark.get();

        // SECURITY CHECK
        if (!bookmark.getUser()
                .getId()
                .equals(user.getId())) {

            redirectAttributes.addFlashAttribute(
                    "errorMsg",
                    "Unauthorized action"
            );

            return "redirect:/bookmarks";
        }

        // DELETE
        bookmarkRepository.delete(bookmark);

        redirectAttributes.addFlashAttribute(
                "successMsg",
                "Bookmark deleted successfully!"
        );

        return "redirect:/bookmarks";
    }
}