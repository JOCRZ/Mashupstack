package com.example.BookmarkApp.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Controller
public class ContactController {

    @Autowired(required = false)
    private JavaMailSender sender;

    // NO @GetMapping here — /about is handled in UserController

    @PostMapping("/contact")
    public String sendContactEmail(
            @RequestParam String name,
            @RequestParam String email,
            @RequestParam String message,
            RedirectAttributes redirectAttributes) {

        if (sender == null) {
            redirectAttributes.addFlashAttribute(
                "errorMsg",
                "Mail service is not configured."
            );
            return "redirect:/about";  // ← points to about page
        }

        try {

            SimpleMailMessage msg = new SimpleMailMessage();
            msg.setTo("your@email.com");
            msg.setReplyTo(email);
            msg.setSubject("New Contact Message from " + name);
            msg.setText(
                "Name    : " + name    + "\n" +
                "Email   : " + email   + "\n" +
                "Message : " + message
            );
            sender.send(msg);

            redirectAttributes.addFlashAttribute(
                "successMsg",
                "Message sent successfully!"
            );

        } catch (MailException ex) {

            redirectAttributes.addFlashAttribute(
                "errorMsg",
                "Failed to send message. Please try again."
            );
        }

        return "redirect:/about";  // ← points to about page
    }
}