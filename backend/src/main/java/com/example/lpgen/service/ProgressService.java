package com.example.lpgen.service;

import com.example.lpgen.model.Progress;
import com.example.lpgen.repo.ProgressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Map;

@Service
public class ProgressService {

    @Autowired
    private ProgressRepository progressRepository;

    // Create or update progress
    public Progress saveOrUpdateProgress(String userId, String pathId, Map<String, Boolean> progressState) {

        Progress existing = progressRepository.findByUserIdAndPathId(userId, pathId);

        if (existing != null) {
            existing.setProgressState(progressState);
            existing.setUpdatedAt(new Date());
            return progressRepository.save(existing);
        }

        Progress newProgress = new Progress(userId, pathId, progressState);
        return progressRepository.save(newProgress);
    }

    // Load progress for a saved path
    public Progress getProgress(String userId, String pathId) {
        return progressRepository.findByUserIdAndPathId(userId, pathId);
    }
}
