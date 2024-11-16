package org.makerminds.javaweb.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.makerminds.javaweb.Entity.Qyteti;
import org.makerminds.javaweb.antonime.CheckNotAdmin;
import org.makerminds.javaweb.response.ApiResponse;
import org.makerminds.javaweb.service.AdminService;
import org.makerminds.javaweb.service.QytetiService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

@Controller
@RequestMapping("/api/qyteti")
@CrossOrigin
public class QytetiController {

    private final QytetiService qytetiService;
  private final AdminService adminservice;
    public QytetiController(QytetiService qytetiService,AdminService adminservice) {
        this.qytetiService = qytetiService;
        this.adminservice=adminservice;
    }

    @PostMapping
    public ResponseEntity<?> createQyteti(@Valid @RequestBody Qyteti qyteti, BindingResult bindingResult,
                                          @RequestHeader("Authorization") String token) {
        // Log për të verifikuar token-in
        System.out.println("Token in createQyteti: " + token);
        
        if (bindingResult.hasErrors()) {
            Map<String, String> errors = new HashMap<>();
            for (FieldError fieldError : bindingResult.getFieldErrors()) {
                errors.put(fieldError.getField(), fieldError.getDefaultMessage());
            }
            return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
        }
        ApiResponse isAdminResponse = adminservice.checkAdmin(token);
        if (!isAdminResponse.isStatus()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("You are not authorized to create a doctor.");
        }
        Qyteti createdQyteti = qytetiService.createQyteti(qyteti);
        return new ResponseEntity<>(createdQyteti, HttpStatus.OK);
    }

    // Get Qyteti by id
    @GetMapping("/{id}")
    public ResponseEntity<Qyteti> getQytetiById(@PathVariable Long id) {
        Qyteti foundQyteti = qytetiService.findById(id);
        if (foundQyteti != null) {
            return ResponseEntity.ok(foundQyteti);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @CheckNotAdmin
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteQyteti(@PathVariable Long id,@RequestHeader("Authorization") String token) {
    	ApiResponse isAdminResponse = adminservice.checkAdmin(token);
        if (!isAdminResponse.isStatus()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("You are not authorized to create a doctor.");
        }
        return qytetiService.deleteQytetiById(id);
    }

    // Get all Qytetet
    @GetMapping("/all")
    public ResponseEntity<List<Qyteti>> getAllQytetet() {
        List<Qyteti> qytetiList = qytetiService.getAllQytetet();
        return ResponseEntity.ok(qytetiList);
    }
}
