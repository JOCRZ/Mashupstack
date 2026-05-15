package com.example.MVP.service;

import java.net.URI;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;

import org.springframework.stereotype.Service;

import com.example.MVP.Model.UrlModel;

@Service
public class UrlNameExtractor {

    public UrlModel extractPreview(String url) {

        UrlModel preview =
                new UrlModel();

        try {

            // Add protocol if missing
            if (!url.startsWith("http")) {

                url = "https://" + url;
            }

            // Fetch HTML
            Document doc =
                    Jsoup.connect(url).get();

            // Extract Open Graph metadata
            String title =
                    doc.select(
                      "meta[property=og:title]")
                      .attr("content");

            String description =
                    doc.select(
                      "meta[property=og:description]")
                      .attr("content");

            String image =
                    doc.select(
                      "meta[property=og:image]")
                      .attr("content");

            // Fallback title
            if (title.isEmpty()) {

                title = doc.title();
            }

            // Fallback description
            if (description.isEmpty()) {

                description =
                        "No description available";
            }

            // Short display URL
            String displayUrl =
                    extractMainUrl(url);

            // Set values
            preview.setTitle(title);

            preview.setDescription(description);

            preview.setImage(image);

            preview.setUrl(url);

            preview.setDisplayUrl(displayUrl);

        } catch (Exception e) {

            preview.setTitle("Invalid URL");

            preview.setDescription(
                    "Could not fetch website preview");

            preview.setImage("");

            preview.setUrl(url);

            preview.setDisplayUrl(url);
        }

        return preview;
    }

    // Extract only main domain
    private String extractMainUrl(String url) {

        try {

            URI uri = new URI(url);

            String host = uri.getHost();

            if (host == null) {

                return url;
            }

            // Remove www
            if (host.startsWith("www.")) {

                host = host.substring(4);
            }

            return "https://" + host;

        } catch (Exception e) {

            return url;
        }
    }
}