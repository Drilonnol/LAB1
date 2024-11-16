package org.makerminds.javaweb.controller;

import org.makerminds.javaweb.Entity.Spitali;
import org.makerminds.javaweb.antonime.CheckNotAdmin;
import org.makerminds.javaweb.response.ApiResponse;
import org.makerminds.javaweb.service.AdminService;
import org.makerminds.javaweb.service.SpitaliService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/spitalet")
@CrossOrigin
public class SpitaliController {

	@Autowired
	private SpitaliService spitaliService;
	
	@Autowired
	private AdminService adminservice;

	@PostMapping("/create/{departmentId}")
	public ResponseEntity<?> createOrUpdateSpitali(@RequestBody Spitali spitalet, 
	                                                @PathVariable Long departmentId,
	                                                @RequestHeader("Authorization") String token) {
	    if (token == null || token.isEmpty()) {
	        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token is required.");
	    }
	    
	    ApiResponse isAdminResponse = adminservice.checkAdmin(token);
	    if (!isAdminResponse.isStatus()) {
	        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("You are not authorized to create a hospital.");
	    }
	    
	    Spitali createdSpitali = spitaliService.teOrUpdateMjeket(spitalet, departmentId);
	    return ResponseEntity.status(HttpStatus.CREATED).body(createdSpitali);
	}

    
    @GetMapping("/{spitaliId}")
    public ResponseEntity<Spitali> getSpitaliById(@PathVariable Long spitaliId) {
        Spitali spitalet = spitaliService.findById(spitaliId);
        if (spitalet != null) {
            return new ResponseEntity<>(spitalet, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/reparti/{repartiId}")
    public ResponseEntity<List<Spitali>> getSpitaletList(@PathVariable Long repartiId) {
        List<Spitali> spitaletList = spitaliService.getSpitaliList(repartiId);
        return new ResponseEntity<>(spitaletList, HttpStatus.OK);
    }
   
    @DeleteMapping("/delete/{repartiId}/{id}")
    public ResponseEntity<?> deleteSpitaliById(@PathVariable Long repartiId, 
    		@PathVariable Long id,
    		@RequestHeader("Authorization") String token) {
    	ApiResponse isAdminResponse = adminservice.checkAdmin(token);
        if (!isAdminResponse.isStatus()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("You are not authorized to create a doctor.");
        }
        return spitaliService.deleteMjeketById(repartiId, id);
    }

    @GetMapping("/get/{repartiId}/{mjeketID}")
    public ResponseEntity<Spitali> getMjeket(@PathVariable Long repartiId, @PathVariable Long mjeketID) {
        Spitali spitalet = spitaliService.getSpitali(repartiId, mjeketID);
        return new ResponseEntity<>(spitalet, HttpStatus.OK);
    }
}
