package com.example.BookmarkApp.Services;

import java.net.URI;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.springframework.stereotype.Service;

import com.example.BookmarkApp.Models.Bookmarks;

@Service
public class URLinfoExtractor {

    public Bookmarks extractPreview(String url) {

        Bookmarks preview = new Bookmarks();

        try {

            // Add https if missing
            if (!url.startsWith("http")) {

                url = "https://" + url;
            }

            // Fetch webpage
            Document doc = Jsoup.connect(url).get();

            // Extract page title
            String title = doc.title();

            // Clean URL
            String cleanedUrl = extractMainUrl(url);

            // Set bookmark values
            preview.setTitle(title);

            preview.setUrl(url);

            preview.setDisplayUrl(cleanedUrl);

        } catch (Exception e) {

            preview.setTitle("Invalid URL");

            preview.setUrl(url);

            preview.setDisplayUrl(url);
        }

        return preview;
    }

    // Extract clean domain
    private String extractMainUrl(String url) {

        try {

            URI uri = new URI(url);

            String host = uri.getHost();

            if (host == null) {

                return url;
            }

            // Remove www.
            if (host.startsWith("www.")) {

                host = host.substring(4);
            }

            return host;

        } catch (Exception e) {

            return url;
        }
    }
}