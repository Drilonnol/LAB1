package org.makerminds.javaweb.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


import org.makerminds.javaweb.Entity.Mjeket;
import org.makerminds.javaweb.response.ApiResponse;
import org.makerminds.javaweb.response.UserResponse;
import org.makerminds.javaweb.service.AdminService;
import org.makerminds.javaweb.service.MjeketService;
import org.springframework.cloud.client.loadbalancer.RequestData;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;


@RestController
@RequestMapping("/api/mjeket")
@CrossOrigin(origins = "http://localhost:3000")
public class MjeketController {

    private final MjeketService mjeketService;
   private final AdminService adminService;
    public MjeketController(MjeketService mjeketService,AdminService adminService) {
        this.mjeketService = mjeketService;
        this.adminService=adminService; 
    }

    @PostMapping(path = "/{qytetiId}/{SpitaliID}/{repartiID}")
    public ResponseEntity<?> createMjeket(@PathVariable Long qytetiId, @PathVariable Long SpitaliID,
                                          @PathVariable Long repartiID,
                                          @Valid @RequestBody Mjeket mjeket,
                                          BindingResult bindingResult,
                                          @RequestHeader("Authorization") String token) {

        // Check for validation errors
        if (bindingResult.hasErrors()) {
            Map<String, String> errors = new HashMap<>();
            for (FieldError fieldError : bindingResult.getFieldErrors()) {
                errors.put(fieldError.getField(), fieldError.getDefaultMessage());
            }
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errors);
        }

        // Check if user is authorized to create a doctor
        ApiResponse isAdminResponse = adminService.checkAdmin(token);
        if (!isAdminResponse.isStatus()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("You are not authorized to create a doctor.");
        }

        // Call service layer to create or update Mjeket
        return ResponseEntity.ok(mjeketService.teOrUpdateMjeket(mjeket, qytetiId, SpitaliID, repartiID));
    }

    /* @PostMapping(path = "/{qytetiId}/{SpitaliID}/{repartiID}")
     public ResponseEntity<?> createMjeket(@PathVariable Long qytetiId, @PathVariable Long SpitaliID,
                                           @PathVariable Long repartiID,
                                           @RequestBody Mjeket mjeket,
                                           @RequestHeader("Authorization") String token) {

        
         ApiResponse isAdminResponse = adminService.checkAdmin(token);
         if (!isAdminResponse.isStatus()) {
             return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("You are not authorized to create a doctor.");
         }

         return ResponseEntity.ok(mjeketService.teOrUpdateMjeket(mjeket, qytetiId, SpitaliID, repartiID));
     }
  */


    @GetMapping(path = "/o/{qytetiId}/{spitaliId}/{repartiId}/{mjekuId}")
    public Mjeket getEmployeeById(@PathVariable Long qytetiId, @PathVariable Long spitaliId,
                                  @PathVariable Long repartiId, @PathVariable Long mjekuId) {
        return mjeketService.getMjke(qytetiId, spitaliId, repartiId, mjekuId);
    }

    @GetMapping(path = "/all/{qytetiId}/{spitaliId}/{repartiId}")
    public List<Mjeket> getEmployeeList(@PathVariable Long qytetiId, @PathVariable Long spitaliId, @PathVariable Long repartiId) {
        return mjeketService.getMjeketList(qytetiId, spitaliId, repartiId);
    }

    @DeleteMapping(path = "/delete/{departmentId}/{id}")
    public ResponseEntity<?> deleteEmployeeById(
                                                @PathVariable Long departmentId, @PathVariable Long id) {
      
        return mjeketService.deleteMjeketById(departmentId, id);
    }
}
