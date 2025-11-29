package com.example.lpgen.service;

import com.example.lpgen.model.SavedLearningPath;
import com.example.lpgen.repo.SavedLearningPathRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SavedLearningPathService {

    @Autowired
    private SavedLearningPathRepository savedLearningPathRepository;

    // Save or update a learning path
    public SavedLearningPath saveLearningPath(SavedLearningPath savedPath) {
        return savedLearningPathRepository.save(savedPath);
    }

    // Get all paths saved by a user
    public List<SavedLearningPath> getUserSavedPaths(String userId) {
        return savedLearningPathRepository.findByUserId(userId);
    }

    // Get a particular saved path for a user
    public SavedLearningPath getSavedPathById(String userId, String pathId) {
        return savedLearningPathRepository.findByIdAndUserId(pathId, userId);
    }

    public void deletePath(String userId, String pathId) {
        SavedLearningPath path = savedLearningPathRepository.findByIdAndUserId(pathId, userId);
        if (path != null) {
            savedLearningPathRepository.delete(path);
        } else {
            throw new RuntimeException("Path not found or unauthorized");
        }
    }
}
