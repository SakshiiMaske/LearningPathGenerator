package com.example.lpgen.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.Map;

@Document(collection = "progress")
public class Progress {

    @Id
    private String id;

    private String userId;
    private String pathId;  // SavedLearningPath.id

    // Key: topicId  |  Value: true/false
    private Map<String, Boolean> progressState;

    private Date updatedAt = new Date();

    public Progress() {}

    public Progress(String userId, String pathId, Map<String, Boolean> progressState) {
        this.userId = userId;
        this.pathId = pathId;
        this.progressState = progressState;
        this.updatedAt = new Date();
    }

    // Getters & Setters

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getPathId() {
        return pathId;
    }

    public void setPathId(String pathId) {
        this.pathId = pathId;
    }

    public Map<String, Boolean> getProgressState() {
        return progressState;
    }

    public void setProgressState(Map<String, Boolean> progressState) {
        this.progressState = progressState;
    }

    public Date getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Date updatedAt) {
        this.updatedAt = updatedAt;
    }
}
