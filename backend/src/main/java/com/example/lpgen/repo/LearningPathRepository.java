package com.example.lpgen.repo;

import com.example.lpgen.model.LearningPath;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface LearningPathRepository extends MongoRepository<LearningPath, String> {
    List<LearningPath> findByUserId(String userId);
}
