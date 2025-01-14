package org.makerminds.javaweb.controller;

import org.makerminds.javaweb.Entity.WorkExperience;
import org.makerminds.javaweb.service.WorkExperienceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/work-experiences")
public class WorkExperienceController {

    private final WorkExperienceService workExperienceService;

    @Autowired
    public WorkExperienceController(WorkExperienceService workExperienceService) {
        this.workExperienceService = workExperienceService;
    }

    @PostMapping("/{employeeId}/{departmentId}/{repartiId}/{infermierertID}")
    public ResponseEntity<WorkExperience> createWorkExperience(
            @RequestBody WorkExperience workExperience,
            @PathVariable Long employeeId,
            @PathVariable Long departmentId,
            @PathVariable Long repartiId,
            @PathVariable Long infermierertID) {
        WorkExperience createdWorkExperience = workExperienceService.createNewTakimet(workExperience, employeeId, departmentId, repartiId, infermierertID);
        return ResponseEntity.ok(createdWorkExperience);
    }

    @PutMapping("/{id}")
    public ResponseEntity<WorkExperience> updateWorkExperience(
            @PathVariable Long id,
            @RequestBody WorkExperience workExperience) {
        WorkExperience updatedWorkExperience = workExperienceService.updateWorkExperience(id, workExperience);
        return ResponseEntity.ok(updatedWorkExperience);
    }

    @GetMapping
    public ResponseEntity<List<WorkExperience>> getAllWorkExperiences() {
        List<WorkExperience> workExperienceList = workExperienceService.getWorkExperienceList();
        return ResponseEntity.ok(workExperienceList);
    }

    @GetMapping("/{id}")
    public ResponseEntity<WorkExperience> getWorkExperienceById(@PathVariable Long id) {
        WorkExperience workExperience = workExperienceService.getWorkExperience(id);
        return ResponseEntity.ok(workExperience);
    }

    @GetMapping("/infermieret/{infermierertID}")
    public ResponseEntity<List<WorkExperience>> getWorkExperiencesByInfermieretId(@PathVariable Long infermierertID) {
        List<WorkExperience> workExperienceList = workExperienceService.getWorkExperiencesByInfermieretId(infermierertID);
        return ResponseEntity.ok(workExperienceList);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteWorkExperience(@PathVariable Long id) {
        workExperienceService.deleteWorkExperience(id);
        return ResponseEntity.noContent().build();
    }
}
