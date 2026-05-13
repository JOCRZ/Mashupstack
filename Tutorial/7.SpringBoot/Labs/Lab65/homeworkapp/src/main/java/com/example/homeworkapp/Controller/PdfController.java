package com.example.homeworkapp.Controller;

import org.springframework.web.bind.annotation.GetMapping;

import com.example.homeworkapp.Models.Books;
import com.itextpdf.text.Document;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.pdf.PdfWriter;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.util.ArrayList;
import java.util.List;

import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;

@Controller
public class PdfController {

    // Library Page
    @GetMapping("/library")
    public String getLibrary(Model model) {

        List<Books> booksList = new ArrayList<>();

        booksList.add(new Books(
                1,
                "Biscuit",
                45.3f,
                "Alyssa Satin Capucilli",
                "A puppy adventure",
                "1996-05-01"));

        booksList.add(new Books(
                2,
                "Java Basics",
                59.99f,
                "James Gosling",
                "Learn Java from scratch",
                "2023-11-15"));

        booksList.add(new Books(
                3,
                "Spring Boot in Action",
                75.50f,
                "Craig Walls",
                "Build robust APIs",
                "2022-03-20"));

        model.addAttribute("books", booksList);

        return "library";
    }

    // PDF Download Page
    @GetMapping("/download-page")
    public String downloadPage() {
        return "download-page";
    }

    // Generate PDF
    @GetMapping("/generate-book-pdf")
    public ResponseEntity<InputStreamResource> generatePdf() {

        List<Books> booksList = new ArrayList<>();

        booksList.add(new Books(
                1,
                "Biscuit",
                45.3f,
                "Alyssa Satin Capucilli",
                "A puppy adventure",
                "1996-05-01"));

        booksList.add(new Books(
                2,
                "Java Basics",
                59.99f,
                "James Gosling",
                "Learn Java from scratch",
                "2023-11-15"));

        booksList.add(new Books(
                3,
                "Spring Boot in Action",
                75.50f,
                "Craig Walls",
                "Build robust APIs",
                "2022-03-20"));

        ByteArrayInputStream bis = createPdf(booksList);

        HttpHeaders headers = new HttpHeaders();

        headers.add(
                "Content-Disposition",
                "attachment; filename=books.pdf");

        return ResponseEntity
                .ok()
                .headers(headers)
                .contentType(MediaType.APPLICATION_PDF)
                .body(new InputStreamResource(bis));
    }

    // PDF Creation Method
    private ByteArrayInputStream createPdf(
            List<Books> booksList) {

        Document document = new Document();

        ByteArrayOutputStream out =
                new ByteArrayOutputStream();

        try {

            PdfWriter.getInstance(document, out);

            document.open();

            document.add(
                    new Paragraph("Library Books Information"));

            document.add(
                    new Paragraph("-----------------------------------"));

            for (Books book : booksList) {

                document.add(new Paragraph(
                        "ID: " + book.getId()));

                document.add(new Paragraph(
                        "Title: " + book.getTitle()));

                document.add(new Paragraph(
                        "Price: ₹" + book.getPrice()));

                document.add(new Paragraph(
                        "Author: " + book.getAuthor()));

                document.add(new Paragraph(
                        "Description: " + book.getDesc()));

                document.add(new Paragraph(
                        "Published Date: " +
                                book.getPdate()));

                document.add(
                        new Paragraph("-----------------------------------"));
            }

            document.close();

        } catch (Exception e) {
            e.printStackTrace();
        }

        return new ByteArrayInputStream(
                out.toByteArray());
    }
}