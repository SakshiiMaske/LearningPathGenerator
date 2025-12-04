package com.example.lpgen.repo;

import com.example.lpgen.model.Progress;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProgressRepository extends MongoRepository<Progress, String> {

    // Get progress for a specific user + path
    Progress findByUserIdAndPathId(String userId, String pathId);

    // Check if user progress already exists
    boolean existsByUserIdAndPathId(String userId, String pathId);
}
