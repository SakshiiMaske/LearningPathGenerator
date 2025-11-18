package com.example.lpgen.service;

import com.example.lpgen.model.LearningPath;
import com.example.lpgen.repo.LearningPathRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
public class LearningPathService {

    private final LearningPathRepository repo;
    public LearningPathService(LearningPathRepository repo) {
        this.repo = repo;
    }

    public LearningPath create(LearningPath lp) {
        lp.setCreatedAt(Instant.now());
        lp.setUpdatedAt(Instant.now());
        return repo.save(lp);
    }

    public LearningPath update(String id, LearningPath updated, String currentUserId) {
        LearningPath existing = repo.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Learning Path not found"));

        if (!existing.getUserId().equals(currentUserId)) {
            throw new SecurityException("You are not authorized to update this learning path");
        }

        existing.setTitle(updated.getTitle());
        existing.setDescription(updated.getDescription());
        existing.setTopics(updated.getTopics());
        existing.setUpdatedAt(Instant.now());

        return repo.save(existing);
    }

    public void delete(String id, String currentUserId) {
        LearningPath lp = repo.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Learning Path not found"));

        if (!lp.getUserId().equals(currentUserId)) {
            throw new SecurityException("You are not authorized to delete this learning path");
        }

        repo.deleteById(id);
    }

    public LearningPath getById(String id) {
        return repo.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Learning Path not found"));
    }

    public List<LearningPath> getByUserId(String userId) {
        return repo.findByUserId(userId);
    }
}
