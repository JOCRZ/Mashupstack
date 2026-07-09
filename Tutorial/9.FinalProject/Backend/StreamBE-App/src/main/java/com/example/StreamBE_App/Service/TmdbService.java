package com.example.StreamBE_App.Service;

import java.net.URI;
import java.net.URLEncoder;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

@Service
public class TmdbService {

    @Value("${app.tmdb.api-key}")
    private String apiKey;

    private final HttpClient client = HttpClient.newHttpClient();
    private final Gson gson = new Gson();

    public Map<String, Object> fetchMovie(String title, int year) {
        Map<String, Object> result = new HashMap<>();
        try {
            String searchUrl = "https://api.themoviedb.org/3/search/movie?query="
                    + URLEncoder.encode(title, StandardCharsets.UTF_8)
                    + "&year=" + year + "&api_key=" + apiKey;

            JsonObject searchData = fetch(searchUrl);
            JsonArray results = searchData.getAsJsonArray("results");

            if (results == null || results.isEmpty()) {
                result.put("error", "Movie not found");
                return result;
            }

            int movieId = results.get(0).getAsJsonObject().get("id").getAsInt();
            JsonObject d = fetch("https://api.themoviedb.org/3/movie/" + movieId + "?api_key=" + apiKey);

            result.put("title", d.get("title").getAsString());
            result.put("description", d.get("overview").getAsString());
            result.put("year", d.get("release_date").getAsString().substring(0, 4));
            result.put("rating", d.get("vote_average").getAsDouble());

            int runtime = d.has("runtime") && !d.get("runtime").isJsonNull() ? d.get("runtime").getAsInt() : 0;
            result.put("duration", runtime > 0 ? runtime + " min" : "");

            result.put("language", d.get("original_language").getAsString().toUpperCase());

            if (d.has("poster_path") && !d.get("poster_path").isJsonNull()) {
                result.put("poster", "https://image.tmdb.org/t/p/w500" + d.get("poster_path").getAsString());
            }
        } catch (Exception e) {
            result.put("error", "Failed to fetch movie details");
        }
        return result;
    }

    private JsonObject fetch(String url) throws Exception {
        HttpRequest req = HttpRequest.newBuilder().uri(URI.create(url)).GET().build();
        String body = client.send(req, HttpResponse.BodyHandlers.ofString()).body();
        return gson.fromJson(body, JsonObject.class);
    }
}
