package com.example.homeworkapp;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class EmailValidator implements ConstraintValidator<GmailOnly, String> {

    @Override
    public boolean isValid(String email, ConstraintValidatorContext context) {

        if (email == null || email.isEmpty()) {
            return true; // let @NotBlank handle empty case
        }

        return email.endsWith("@gmail.com");
    }
}