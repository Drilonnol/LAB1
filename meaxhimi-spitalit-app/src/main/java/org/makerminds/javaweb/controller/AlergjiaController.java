package org.makerminds.javaweb.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.makerminds.javaweb.Entity.Alergjia;
import org.makerminds.javaweb.Entity.Takimet;
import org.makerminds.javaweb.antonime.CheckNotAdmin;
import org.makerminds.javaweb.response.ApiResponse;
import org.makerminds.javaweb.service.AdminService;
import org.makerminds.javaweb.service.AlergjiaService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/alergjia")
@RequiredArgsConstructor
@CrossOrigin
public class AlergjiaController {


	    private final AlergjiaService alergjiaService;
	     private final AdminService adminService;

	    @PostMapping("/{repartiId}/{pacinetiId}")
	    public ResponseEntity<?> createAlergjia(
	            @PathVariable Long repartiId,  // korrigjuar nga 'reaprtiId' në 'repartiId'
	            @PathVariable Long pacinetiId,
	            @Valid @RequestBody Alergjia newTask, BindingResult results,
	            @RequestHeader("Authorization") String token) {
		
		ApiResponse isAdminResponse = adminService.checkAdmin(token);
        if (!isAdminResponse.isStatus()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("You are not authorized to create a doctor.");
        }
	        if (results.hasErrors()) {
	            Map<String, String> errors = new HashMap<>();
	            for (FieldError fieldError : results.getFieldErrors()) {
	                errors.put(fieldError.getField(), fieldError.getDefaultMessage());
	            }
	            return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
	        }

	        return new ResponseEntity<>(alergjiaService.createNewTakimet(newTask, repartiId, pacinetiId), HttpStatus.CREATED);
	    }
	    
	    @GetMapping(path = "/{repartiId}/{pcinetiId}")
	    public List<Alergjia> getTaskList(@PathVariable Long repartiId, @PathVariable Long pcinetiId) {
	        return alergjiaService.getTaskList(repartiId, pcinetiId);
	    }
	    
	    @DeleteMapping(path = "/delete/{departmentId}/{employeeId}/{taskId}")
	    public ResponseEntity<?> deleteTask(@PathVariable Long departmentId,
		    		@PathVariable Long employeeId, 
		    		@PathVariable Long taskId,
		    		@RequestHeader("Authorization") String token) {
	    	ApiResponse isAdminResponse = adminService.checkAdmin(token);
	        if (!isAdminResponse.isStatus()) {
	            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("You are not authorized to create a doctor.");
	        }
	        return alergjiaService.deleteTask(departmentId, employeeId, taskId);
	    }

	    @GetMapping(path = "/get/{departmentId}/{employeeId}/{taskId}")
	    public ResponseEntity<?> getTask(@PathVariable Long departmentId, @PathVariable Long employeeId, @PathVariable Long taskId) {
	        return new ResponseEntity<>(alergjiaService.getTask(departmentId, employeeId, taskId), HttpStatus.OK);
	    }

}
