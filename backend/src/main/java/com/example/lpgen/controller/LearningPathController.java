package com.example.lpgen.controller;

import com.example.lpgen.model.LearningPath;
import com.example.lpgen.service.LearningPathService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/paths")
public class LearningPathController {

    private final LearningPathService service;

    public LearningPathController(LearningPathService service) {
        this.service = service;
    }

    // Create
    @PostMapping
    public LearningPath create(
            @RequestHeader("X-USER-ID") String userId,
            @RequestBody LearningPath lp
    ) {
        lp.setUserId(userId);
        return service.create(lp);
    }

    // Get all paths of logged in user
    @GetMapping
    public List<LearningPath> listMine(
            @RequestHeader("X-USER-ID") String userId
    ) {
        return service.getByUserId(userId);
    }

    // Get single path
    @GetMapping("/{id}")
    public LearningPath get(@PathVariable String id) {
        return service.getById(id);
    }

    // Update
    @PutMapping("/{id}")
    public LearningPath update(
            @PathVariable String id,
            @RequestHeader("X-USER-ID") String userId,
            @RequestBody LearningPath updated
    ) {
        return service.update(id, updated, userId);
    }

    // Delete
    @DeleteMapping("/{id}")
    public void delete(
            @PathVariable String id,
            @RequestHeader("X-USER-ID") String userId
    ) {
        service.delete(id, userId);
    }
}
