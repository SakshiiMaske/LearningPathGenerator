package com.example.lpgen.model;

import org.springframework.data.annotation.Id;

public class Topic {

    @Id
    private String id;

    private String title;
    private String description;
    private int estimatedHours;

    public Topic() {
    }

    public Topic(String id, String title, String description, int estimatedHours) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.estimatedHours = estimatedHours;
    }

    // Getters & Setters

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getEstimatedHours() {
        return estimatedHours;
    }

    public void setEstimatedHours(int estimatedHours) {
        this.estimatedHours = estimatedHours;
    }

    @Override
    public String toString() {
        return "Topic{" +
                "id='" + id + '\'' +
                ", title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", estimatedHours=" + estimatedHours +
                '}';
    }
}
