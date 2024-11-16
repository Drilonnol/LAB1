package org.makerminds.javaweb.controller;

import org.makerminds.javaweb.Entity.Receta;
import org.makerminds.javaweb.antonime.CheckNotAdmin;
import org.makerminds.javaweb.response.ApiResponse;
import org.makerminds.javaweb.service.AdminService;
import org.makerminds.javaweb.service.ReceptaServise;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/receta")
@CrossOrigin
public class RecetaController {

    private final ReceptaServise receptaServise;
    private final AdminService adminservice;

    @Autowired
    public RecetaController(ReceptaServise receptaServise,AdminService adminservice) {
        this.receptaServise = receptaServise;
        this.adminservice=adminservice;
    }

    @PostMapping("/in/{mjekId}")
    public ResponseEntity<?> createReceta(@RequestBody Receta receta, @PathVariable Long mjekId, @RequestHeader("Authorization") String token) {
        if (token == null || token.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token is required.");
        }
        
        ApiResponse isAdminResponse = adminservice.checkAdmin(token);
        if (!isAdminResponse.isStatus()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("You are not authorized to create a doctor.");
        }

        Receta createdReceta = receptaServise.createNewReceta(receta, mjekId);
        return ResponseEntity.ok(createdReceta);
    }

    @GetMapping("/{id}")
    public Receta getRecetaById(@PathVariable Long id) {
        return receptaServise.getRecetaById(id);
    }

    @GetMapping("/mjek/{departmentId}/{mjekId}")
    public List<Receta> getRecetaByMjekId(@PathVariable Long departmentId, @PathVariable Long mjekId) {
        return receptaServise.getTaskList(departmentId, mjekId);
    }

    @PutMapping("/{id}")
    public Receta updateReceta(@PathVariable Long id, @RequestBody Receta recetaDetails) {
        return receptaServise.updateReceta(id, recetaDetails);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteReceta(@PathVariable Long id, @RequestHeader("Authorization") String token) {
        ApiResponse isAdminResponse = adminservice.checkAdmin(token);
        if (!isAdminResponse.isStatus()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("You are not authorized to delete a recipe.");
        }
        try {
            receptaServise.deleteReceta(id);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while deleting the recipe.");
        }
    }

}
