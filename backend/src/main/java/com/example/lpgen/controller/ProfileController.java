package com.example.lpgen.controller;

import com.example.lpgen.model.SavedLearningPath;
import com.example.lpgen.service.SavedLearningPathService;
import com.example.lpgen.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/profile")
@CrossOrigin(origins = "*")
public class ProfileController {

    @Autowired
    private SavedLearningPathService savedLearningPathService;

    @Autowired
    private UserService userService;

    // Save a generated learning path to profile
    @PostMapping("/save")
    public SavedLearningPath saveLearningPath(
            @RequestHeader("userId") String userId,
            @RequestBody SavedLearningPath savedPath
    ) {
        savedPath.setUserId(userId);
        return savedLearningPathService.saveLearningPath(savedPath);
    }

    // Get all saved learning paths of a user
    @GetMapping("/paths")
    public List<SavedLearningPath> getUserPaths(
            @RequestHeader("userId") String userId
    ) {
        return savedLearningPathService.getUserSavedPaths(userId);
    }

    // Get a specific saved learning path
    @GetMapping("/paths/{pathId}")
    public SavedLearningPath getSingleSavedPath(
            @RequestHeader("userId") String userId,
            @PathVariable String pathId
    ) {
        return savedLearningPathService.getSavedPathById(userId, pathId);
    }

    @DeleteMapping("/paths/{pathId}")
    public ResponseEntity<String> deleteSavedPath(
            @RequestHeader("userId") String userId,
            @PathVariable String pathId
    ) {
        savedLearningPathService.deletePath(userId, pathId);
        return ResponseEntity.ok("Deleted successfully");
    }
}
