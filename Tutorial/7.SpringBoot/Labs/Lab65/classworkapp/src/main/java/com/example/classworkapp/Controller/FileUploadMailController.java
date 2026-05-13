package com.example.classworkapp.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Controller
public class FileUploadMailController {

    private static final String UPLOADED_FOLDER = "uploads/";

    @Autowired
    private JavaMailSender sender;

    @GetMapping("/uploadFile")
    public String showUploadPage() {
        return "upload";
    }

    @PostMapping("/uploadFile")
    public String uploadFile(
            @RequestParam("file") MultipartFile file,
            Model model) {

        if (file.isEmpty()) {

            model.addAttribute(
                    "message",
                    "Please select a file.");

            return "upload";
        }

        try {

            // Create upload folder
            Path uploadPath = Paths.get(UPLOADED_FOLDER);

            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            // Save file
            byte[] bytes = file.getBytes();

            Path path = Paths.get(
                    UPLOADED_FOLDER +
                    file.getOriginalFilename());

            Files.write(path, bytes);

            // Send email
            SimpleMailMessage msg =
                    new SimpleMailMessage();

            msg.setTo("receiver@mailtrap.io");
            msg.setSubject("File Upload Confirmation");

            msg.setText(
                    "File uploaded successfully.\n\n" +
                    "Filename: " +
                    file.getOriginalFilename());

            sender.send(msg);

            // SUCCESS MESSAGE
            model.addAttribute(
                    "message",
                    "File uploaded and email sent successfully.");

        } catch (Exception e) {

            e.printStackTrace();

            model.addAttribute(
                    "message",
                    "Upload successful but email failed: "
                            + e.getMessage());
        }

        return "upload";
    }
}