package com.example.lpgen.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

@Service
public class AiService {

    @Value("${groq.api.key}")
    private String apiKey;

    private final HttpClient httpClient = HttpClient.newHttpClient();
    private final ObjectMapper mapper = new ObjectMapper();

    public String generateLearningPath(String career) {

        try {

            // SAFE SINGLE-LINE PROMPT FOR GROQ
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

            // Escape special characters for JSON
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

            System.out.println("GROQ RAW RESPONSE: " + response.body());

            JsonNode root = mapper.readTree(response.body());

            if (root.has("error")) {
                return "GROQ API Error: " + root.get("error").get("message").asText();
            }

            String aiText = root
                    .get("choices").get(0)
                    .get("message").get("content")
                    .asText();

            // Clean any unexpected code blocks
            String cleaned = aiText
                    .replace("```json", "")
                    .replace("```", "")
                    .trim();

            return cleaned;

        } catch (Exception e) {
            e.printStackTrace();
            return "Error generating learning path: " + e.getMessage();
        }
    }
}
