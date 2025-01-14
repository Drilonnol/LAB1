
package org.makerminds.javaweb.controller;

import org.makerminds.javaweb.Entity.Specializimi;
import org.makerminds.javaweb.antonime.CheckNotAdmin;
import org.makerminds.javaweb.service.SpecializimiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/specializimi")
@CrossOrigin
public class SpecializimiController {

    private final SpecializimiService specializimiService;

    @Autowired
    public SpecializimiController(SpecializimiService specializimiService) {
        this.specializimiService = specializimiService;
    }
   
    @PostMapping("/{mjekuId}")
    public ResponseEntity<Specializimi> createSpecializimi(@PathVariable Long mjekuId,
                                                           @RequestBody Specializimi newSpecializimi,
                                                           @RequestHeader("Authorization") String token) {
        try {
            Specializimi specializimi = specializimiService.createNewSpecializimi(newSpecializimi, mjekuId);
            return ResponseEntity.ok(specializimi);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @GetMapping("/{mjekuId}")
    public ResponseEntity<Specializimi> getSpecializimi(@PathVariable Long mjekuId) {
        try {
            Specializimi specializimi = specializimiService.findSpecializimiByMjekuId(mjekuId);
            return ResponseEntity.ok(specializimi);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @PutMapping("/{mjekuId}")
    public ResponseEntity<Specializimi> updateSpecializimi(@PathVariable Long mjekuId,
                                                           @RequestBody Specializimi updatedSpecializimi) {
        try {
            Specializimi specializimi = specializimiService.updateSpecializimiByMjekuId(mjekuId, updatedSpecializimi);
            return ResponseEntity.ok(specializimi);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }
  
    @DeleteMapping("/{mjekuId}")
    public ResponseEntity<String> deleteSpecializimi(@PathVariable Long mjekuId, @RequestHeader("Authorization") String token) {
        try {
            specializimiService.deleteSpecializimiByMjekuId(mjekuId);
            return ResponseEntity.ok("Specializimi has been deleted");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<List<Specializimi>> getAllSpecializimet() {
        List<Specializimi> specializimet = specializimiService.getAllSpecializimet();
        return ResponseEntity.ok(specializimet);
    }
}
