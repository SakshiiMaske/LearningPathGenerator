package com.example.lpgen.model;

import java.util.List;

public class Step {

    private int id;
    private String title;
    private String duration;
    private List<String> bullets;

    public Step() {}

    public Step(int id, String title, String duration, List<String> bullets) {
        this.id = id;
        this.title = title;
        this.duration = duration;
        this.bullets = bullets;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDuration() {
        return duration;
    }

    public void setDuration(String duration) {
        this.duration = duration;
    }

    public List<String> getBullets() {
        return bullets;
    }

    public void setBullets(List<String> bullets) {
        this.bullets = bullets;
    }
}
