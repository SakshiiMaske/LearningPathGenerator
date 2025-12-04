package com.example.lpgen.controller;

import com.example.lpgen.model.Progress;
import com.example.lpgen.service.ProgressService;
import com.example.lpgen.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/progress")
@CrossOrigin(origins = "*")
public class ProgressController {

    @Autowired
    private ProgressService progressService;

    @Autowired
    private UserService userService;

    // Save or update progress
    @PostMapping("/{pathId}")
    public Progress saveProgress(
            @PathVariable String pathId,
            @RequestHeader("userId") String userId,
            @RequestBody Map<String, Boolean> progressState
    ) {
        return progressService.saveOrUpdateProgress(userId, pathId, progressState);
    }

    // Get progress of a path
    @GetMapping("/{pathId}")
    public Progress getProgress(
            @PathVariable String pathId,
            @RequestHeader("userId") String userId
    ) {
        return progressService.getProgress(userId, pathId);
    }
}
