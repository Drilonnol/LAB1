package org.makerminds.javaweb.controller;

import org.makerminds.javaweb.Entity.Certification;
import org.makerminds.javaweb.service.CertificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/certifications")
public class CertificationController {

    private final CertificationService certificationService;

    @Autowired
    public CertificationController(CertificationService certificationService) {
        this.certificationService = certificationService;
    }

    @PostMapping("/{employeeId}/{departmentId}/{repartiId}/{infermierertID}")
    public ResponseEntity<Certification> createCertification(
            @RequestBody Certification certification,
            @PathVariable Long departmentId,
            @PathVariable Long employeeId,
            @PathVariable Long repartiId,
            @PathVariable Long infermierertID) {
        Certification createdCertification = certificationService.createNewCertification(certification, departmentId, employeeId, repartiId, infermierertID);
        return ResponseEntity.ok(createdCertification);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Certification> updateCertification(
            @PathVariable Long id,
            @RequestBody Certification certification) {
        Certification updatedCertification = certificationService.updateCertification(id, certification);
        return ResponseEntity.ok(updatedCertification);
    }

    @GetMapping
    public ResponseEntity<List<Certification>> getAllCertifications() {
        List<Certification> certificationList = certificationService.getCertificationList();
        return ResponseEntity.ok(certificationList);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Certification> getCertificationById(@PathVariable Long id) {
        Certification certification = certificationService.getCertification(id);
        return ResponseEntity.ok(certification);
    }

    @GetMapping("/infermier/{infermierId}")
    public ResponseEntity<List<Certification>> getCertificationsByInfermierId(@PathVariable Long infermierId) {
        List<Certification> certificationList = certificationService.getCertificationByInfermierId(infermierId);
        return ResponseEntity.ok(certificationList);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCertification(@PathVariable Long id) {
        certificationService.deleteCertification(id);
        return ResponseEntity.noContent().build();
    }
}