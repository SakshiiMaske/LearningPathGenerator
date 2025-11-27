package com.example.lpgen.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document(collection = "saved_learning_paths")
public class SavedLearningPath {

    @Id
    private String id;

    private String userId;
    private String pathName;        // e.g., "Java Developer Roadmap"
    private LearningPath learningPath;
    private Date savedAt = new Date();

    public SavedLearningPath() {}

    public SavedLearningPath(String userId, String pathName, LearningPath learningPath) {
        this.userId = userId;
        this.pathName = pathName;
        this.learningPath = learningPath;
        this.savedAt = new Date();
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

    public String getPathName() {
        return pathName;
    }

    public void setPathName(String pathName) {
        this.pathName = pathName;
    }

    public LearningPath getLearningPath() {
        return learningPath;
    }

    public void setLearningPath(LearningPath learningPath) {
        this.learningPath = learningPath;
    }

    public Date getSavedAt() {
        return savedAt;
    }

    public void setSavedAt(Date savedAt) {
        this.savedAt = savedAt;
    }
}
