package org.makerminds.javaweb.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.makerminds.javaweb.Entity.Mjeket;
import org.makerminds.javaweb.Entity.Pacienti;
import org.makerminds.javaweb.antonime.CheckNotAdmin;
import org.makerminds.javaweb.response.ApiResponse;
import org.makerminds.javaweb.service.AdminService;
import org.makerminds.javaweb.service.MjeketService;
import org.makerminds.javaweb.service.PacinetiService;
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
@RequestMapping("/api/pacient")
@RequiredArgsConstructor
@CrossOrigin
public class PacientiControler {
	
	    private final PacinetiService mjeketservice;
	   private final AdminService adminservice;
	    
	
	    @PostMapping(path="/add/{qytetiId}/{SpitaliID}/{repartiID}")
	    public ResponseEntity<?> createMjeket(@PathVariable Long qytetiId,@PathVariable Long SpitaliID,
	    		@PathVariable Long repartiID,@Valid 
	    		@RequestBody Pacienti mjeket, BindingResult bindingResult,
	    		@RequestHeader("Authorization") String token) {
			
			ApiResponse isAdminResponse = adminservice.checkAdmin(token);
	        if (!isAdminResponse.isStatus()) {
	            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("You are not authorized to create a doctor.");
	        }
			
	    	if(bindingResult.hasErrors()) {
	    		Map<String,String>errors = new HashMap<>();
	    		for (FieldError filedError : bindingResult.getFieldErrors()) {
	    			errors.put(filedError.getField() , filedError.getDefaultMessage());
	    			
	    		}
	    		return new ResponseEntity<Map<String,String>>(errors ,HttpStatus.BAD_REQUEST);
	    	}
	    	return ResponseEntity.ok(mjeketservice.createpacient(mjeket,qytetiId,SpitaliID,repartiID));
	       
	    }
	    @GetMapping(path = "/o/{qytetiId}/{spitaliId}/{repartiId}/{pacinetId}")
	    public Pacienti getEmployeeById(
	    		@PathVariable Long qytetiId, @PathVariable Long spitaliId,
	    		@PathVariable Long repartiId,@PathVariable Long pacinetId) {
	        return mjeketservice.getMjke(qytetiId, spitaliId,repartiId,pacinetId);
	    }
	    @GetMapping(path = "/all/{qytetiId}/{spitaliId}/{repartiId}")
	    public List<Pacienti>getEmployeeList(@PathVariable Long qytetiId,@PathVariable Long spitaliId,@PathVariable Long repartiId){
	    	return mjeketservice.getMjeketList(qytetiId,spitaliId,repartiId);
	    }
		
	    @DeleteMapping(path = "/delete/{departmentId}/{id}")
	    public ResponseEntity<?>deleteEmployeeById(@PathVariable Long departmentId, @PathVariable Long id,
	    		@RequestHeader("Authorization") String token){
			ApiResponse isAdminResponse = adminservice.checkAdmin(token);
	        if (!isAdminResponse.isStatus()) {
	            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("You are not authorized to create a doctor.");
	        }
	    	return mjeketservice.deleteMjeketById(departmentId,id);
	    	
	    }
}
