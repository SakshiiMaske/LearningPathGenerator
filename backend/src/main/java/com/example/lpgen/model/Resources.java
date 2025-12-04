package com.example.lpgen.model;

import java.util.List;

public class Resources {

    private List<ResourceItem> youtubeVideos;   // top 2 YouTube videos
    private List<ResourceItem> courses;         // top 2 courses

    public Resources() {}

    public Resources(List<ResourceItem> youtubeVideos,
                     List<ResourceItem> courses) {
        this.youtubeVideos = youtubeVideos;
        this.courses = courses;
    }

    public List<ResourceItem> getYoutubeVideos() {
        return youtubeVideos;
    }

    public void setYoutubeVideos(List<ResourceItem> youtubeVideos) {
        this.youtubeVideos = youtubeVideos;
    }

    public List<ResourceItem> getCourses() {
        return courses;
    }

    public void setCourses(List<ResourceItem> courses) {
        this.courses = courses;
    }
}
