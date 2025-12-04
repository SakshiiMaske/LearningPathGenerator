package com.example.lpgen.controller;

import com.example.lpgen.service.AiService;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/ai")
@CrossOrigin("*")
public class AiController {

    private final AiService aiService;

    public AiController(AiService aiService) {
        this.aiService = aiService;
    }

    @PostMapping("/generate")
    public String generate(@RequestBody Map<String, String> body) {
        return aiService.generateLearningPath(body.get("career"));
    }
}
