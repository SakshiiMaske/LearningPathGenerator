package com.example.lpgen.model;

import java.util.List;

public class LearningPath {

    private String goal;
    private String estimated;
    private List<Step> steps;

    public LearningPath() {}

    public LearningPath(String goal, String estimated, List<Step> steps) {
        this.goal = goal;
        this.estimated = estimated;
        this.steps = steps;
    }

    public String getGoal() {
        return goal;
    }

    public void setGoal(String goal) {
        this.goal = goal;
    }

    public String getEstimated() {
        return estimated;
    }

    public void setEstimated(String estimated) {
        this.estimated = estimated;
    }

    public List<Step> getSteps() {
        return steps;
    }

    public void setSteps(List<Step> steps) {
        this.steps = steps;
    }
}
