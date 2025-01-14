package org.makerminds.javaweb.controller;

import org.makerminds.javaweb.Entity.Cv;
import org.makerminds.javaweb.service.CvService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cvs")
public class CvController {

    private final CvService cvService;

    @Autowired
    public CvController(CvService cvService) {
        this.cvService = cvService;
    }

    @PostMapping("/{employeeId}/{departmentId}/{repartiId}/{infermierertID}")
    public ResponseEntity<Cv> createCv(
            @RequestBody Cv cv,
            @PathVariable Long employeeId,
            @PathVariable Long departmentId,
            @PathVariable Long repartiId,
            @PathVariable Long infermierertID) {
        Cv createdCv = cvService.createNewCv(cv, employeeId, departmentId, repartiId, infermierertID);
        return ResponseEntity.ok(createdCv);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Cv> updateCv(
            @PathVariable Long id,
            @RequestBody Cv cv) {
        Cv updatedCv = cvService.updateCv(id, cv);
        return ResponseEntity.ok(updatedCv);
    }

    @GetMapping
    public ResponseEntity<List<Cv>> getAllCvs() {
        List<Cv> cvList = cvService.getCvList();
        return ResponseEntity.ok(cvList);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Cv> getCvById(@PathVariable Long id) {
        Cv cv = cvService.getCv(id);
        return ResponseEntity.ok(cv);
    }

    @GetMapping("/infermieret/{infermierertID}")
    public ResponseEntity<List<Cv>> getCvByInfermieretId(@PathVariable Long infermierertID) {
        List<Cv> cvList = cvService.getCvByInfermieretId(infermierertID);
        return ResponseEntity.ok(cvList);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCv(@PathVariable Long id) {
        cvService.deleteCv(id);
        return ResponseEntity.noContent().build();
    }
}
