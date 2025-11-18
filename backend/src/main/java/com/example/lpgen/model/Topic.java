package com.example.lpgen.model;

public class Topic {

    private String title;
    private String description;
    private int estimatedHours;

    // No-args constructor
    public Topic() {
    }

    // All-args constructor
    public Topic(String title, String description, int estimatedHours) {
        this.title = title;
        this.description = description;
        this.estimatedHours = estimatedHours;
    }

    // Getters & Setters
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
                "title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", estimatedHours=" + estimatedHours +
                '}';
    }
}
