package com.example.BookmarkApp.exception;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    // Catch everything not handled elsewhere
    @ExceptionHandler(Exception.class)
    public String handleGenericException(Exception ex, Model model) {
        model.addAttribute("errorMsg", "Something went wrong. Please try again.");
        return "error"; // needs an error.html page
    }

    // Catch illegal access attempts (e.g. someone edits URL manually)
    @ExceptionHandler(SecurityException.class)
    public String handleSecurityException(Model model) {
        model.addAttribute("errorMsg", "You are not allowed to do that.");
        return "error";
    }
}