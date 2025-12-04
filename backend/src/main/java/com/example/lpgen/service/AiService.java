package com.example.lpgen.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.URLEncoder;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;

@Service
public class AiService {

    @Value("${groq.api.key}")
    private String apiKey;

    @Value("${youtube.api.key}")
    private String youtubeKey;

    private final HttpClient httpClient = HttpClient.newHttpClient();
    private final ObjectMapper mapper = new ObjectMapper();


    /*--------------------------------------------------------------------
     * FETCH YOUTUBE VIDEOS
     *-------------------------------------------------------------------*/
    private ArrayNode fetchYoutubeVideos(String topic) {
        try {
            String encoded = URLEncoder.encode(topic, StandardCharsets.UTF_8);

            String url =
                    "https://www.googleapis.com/youtube/v3/search" +
                            "?part=snippet" +
                            "&type=video" +
                            "&maxResults=3" +
                            "&order=viewCount" +        // POPULAR VIDEOS
                            "&q=" + encoded +
                            "&key=" + youtubeKey;

            HttpRequest req = HttpRequest.newBuilder()
                    .uri(URI.create(url))
                    .GET()
                    .build();

            HttpResponse<String> res = httpClient.send(req, HttpResponse.BodyHandlers.ofString());
            JsonNode root = mapper.readTree(res.body());

            ArrayNode arr = mapper.createArrayNode();

            JsonNode items = root.get("items");
            if (items == null || !items.isArray()) return arr;

            for (JsonNode item : items) {
                ObjectNode vid = mapper.createObjectNode();

                vid.put("title", item.get("snippet").get("title").asText());
                vid.put("url", "https://www.youtube.com/watch?v=" +
                        item.get("id").get("videoId").asText());
                vid.put("thumbnail", item.get("snippet").get("thumbnails")
                        .get("high").get("url").asText());

                arr.add(vid);
            }

            return arr;

        } catch (Exception ex) {
            ex.printStackTrace();
            return mapper.createArrayNode();
        }
    }


    /*--------------------------------------------------------------------
     * FETCH UDEMY COURSES
     *-------------------------------------------------------------------*/
    private ArrayNode fetchUdemyCourses(String topic) {
        try {
            String encoded = URLEncoder.encode(topic, StandardCharsets.UTF_8);
            String url = "https://www.udemy.com/api-2.0/courses/?search=" + encoded;

            HttpRequest req = HttpRequest.newBuilder()
                    .uri(URI.create(url))
                    .header("Accept", "application/json")
                    .GET()
                    .build();

            HttpResponse<String> res = httpClient.send(req, HttpResponse.BodyHandlers.ofString());
            JsonNode root = mapper.readTree(res.body());

            ArrayNode arr = mapper.createArrayNode();

            if (!root.has("results")) return arr;

            int count = 0;
            for (JsonNode c : root.get("results")) {
                if (count >= 2) break;

                ObjectNode course = mapper.createObjectNode();
                course.put("title", c.get("title").asText());
                course.put("url", "https://www.udemy.com" + c.get("url").asText());

                arr.add(course);
                count++;
            }

            return arr;

        } catch (Exception ex) {
            ex.printStackTrace();
            return mapper.createArrayNode();
        }
    }


    /*--------------------------------------------------------------------
     * MAIN: GENERATE LEARNING PATH (Steps + Resources)
     *-------------------------------------------------------------------*/
    public String generateLearningPath(String career) {

        try {

            // SAFE WORKING PROMPT
            String prompt = (
                    "You are an AI that generates structured learning paths. " +
                            "Generate a learning path for the career: " + career + ". " +
                            "Return the response STRICTLY in this JSON structure only: " +
                            "{ " +
                            "\"goal\": \"" + career + "\", " +
                            "\"estimated\": \"8–12 weeks\", " +
                            "\"steps\": [" +
                            "{ \"id\": 1, \"title\": \"Core Java Basics\", \"bullets\": [\"Variables\", \"Loops\"], \"duration\": \"7–10 days\" }" +
                            "] " +
                            "} " +
                            "RULES: ONLY return valid JSON. NO markdown. NO text outside JSON."
            );

            prompt = prompt.replace("\"", "\\\"");

            String requestBody = """
                    {
                      "model": "llama-3.1-8b-instant",
                      "messages": [
                        {
                          "role": "user",
                          "content": "%s"
                        }
                      ],
                      "max_tokens": 800
                    }
                    """.formatted(prompt);

            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create("https://api.groq.com/openai/v1/chat/completions"))
                    .header("Content-Type", "application/json")
                    .header("Authorization", "Bearer " + apiKey)
                    .POST(HttpRequest.BodyPublishers.ofString(requestBody))
                    .build();

            HttpResponse<String> response =
                    httpClient.send(request, HttpResponse.BodyHandlers.ofString());

            JsonNode root = mapper.readTree(response.body());

            if (root.has("error")) {
                return "GROQ API Error: " + root.get("error").get("message").asText();
            }

            String aiText = root.get("choices").get(0).get("message").get("content").asText();
            aiText = aiText.replace("```json", "").replace("```", "").trim();

            // Groq JSON
            JsonNode learningJson = mapper.readTree(aiText);


            /*  ADD RESOURCES */
            ArrayNode yt = fetchYoutubeVideos(career);
            ArrayNode courses = fetchUdemyCourses(career);

            ObjectNode resources = mapper.createObjectNode();
            resources.set("youtubeVideos", yt);
            resources.set("courses", courses);

            ((ObjectNode) learningJson).set("resources", resources);


            return mapper.writeValueAsString(learningJson);

        } catch (Exception e) {
            e.printStackTrace();
            return "Error generating learning path: " + e.getMessage();
        }
    }
}
