package org.makerminds.javaweb.controller;

import org.makerminds.javaweb.Entity.DosjaMejeksore;
import org.makerminds.javaweb.service.DosjaMejeksoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/dosjamejeksore")
public class DosjaMejeksoreController {

    private final DosjaMejeksoreService dosjaMejeksoreService;

    @Autowired
    public DosjaMejeksoreController(DosjaMejeksoreService dosjaMejeksoreService) {
        this.dosjaMejeksoreService = dosjaMejeksoreService;
    }

    @PostMapping("/create/{pacientiId}")
    public ResponseEntity<DosjaMejeksore> createDosjaMejeksore(@RequestBody DosjaMejeksore dosjaMejeksore, @PathVariable Long pacientiId) {
        DosjaMejeksore newDosjaMejeksore = dosjaMejeksoreService.createNewDosjaMejeksore(dosjaMejeksore, pacientiId);
        return ResponseEntity.ok(newDosjaMejeksore);
    }

    @GetMapping("/{pacientiId}")
    public ResponseEntity<DosjaMejeksore> getDosjaMejeksoreByPacientiId(@PathVariable Long pacientiId) {
        DosjaMejeksore dosjaMejeksore = dosjaMejeksoreService.getDosjaMejeksoreByPacientiId(pacientiId);
        return ResponseEntity.ok(dosjaMejeksore);
    }

    @PutMapping("/{dosjaId}")
    public ResponseEntity<DosjaMejeksore> updateDosjaMejeksore(@PathVariable Long dosjaId, @RequestBody DosjaMejeksore updatedDosjaMejeksore) {
        DosjaMejeksore updatedDosja = dosjaMejeksoreService.updateDosjaMejeksore(dosjaId, updatedDosjaMejeksore);
        return ResponseEntity.ok(updatedDosja);
    }

    @DeleteMapping("/{dosjaId}")
    public ResponseEntity<?> deleteDosjaMejeksore(@PathVariable Long dosjaId) {
        dosjaMejeksoreService.deleteDosjaMejeksore(dosjaId);
        return ResponseEntity.ok().body("Dosja mjeksore u fshi me sukses");
    }
}
