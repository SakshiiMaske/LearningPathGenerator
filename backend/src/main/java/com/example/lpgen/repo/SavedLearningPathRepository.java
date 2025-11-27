package com.example.lpgen.repo;

import com.example.lpgen.model.SavedLearningPath;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SavedLearningPathRepository extends MongoRepository<SavedLearningPath, String> {

    // Get all saved paths for a specific user
    List<SavedLearningPath> findByUserId(String userId);

    // Optional: Find a specific saved path by user + pathId
    SavedLearningPath findByIdAndUserId(String id, String userId);
}
