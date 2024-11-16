package org.makerminds.javaweb.controller;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.makerminds.javaweb.Entity.Takimet;
import org.makerminds.javaweb.dto.UserWithMeetings;
import org.makerminds.javaweb.response.UserResponse;
import org.makerminds.javaweb.service.TakimetService;
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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/takimet")
@RequiredArgsConstructor
@CrossOrigin
public class TakimetController {

    private final TakimetService takimetService;

    @PostMapping(path = "/create/{departmentId}/{employeeId}/{userId}")
    public ResponseEntity<?> createNewTakimet(
            @PathVariable Long departmentId,
            @PathVariable Long employeeId,
            @PathVariable Long userId,
            @Valid @RequestBody Takimet newTask, BindingResult results) {

        if (results.hasErrors()) {
            Map<String, String> errors = new HashMap<>();
            for (FieldError fieldError : results.getFieldErrors()) {
                errors.put(fieldError.getField(), fieldError.getDefaultMessage());
            }
            return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(takimetService.createNewTakimet(newTask, employeeId, departmentId, userId), HttpStatus.CREATED);
    }

    @GetMapping(path = "/{departmentId}/{employeeId}")
    public List<Takimet> getTaskList(@PathVariable Long departmentId, @PathVariable Long employeeId) {
        return takimetService.getTaskList(departmentId, employeeId);
    }

    @DeleteMapping(path = "/delete/{departmentId}/{employeeId}/{taskId}")
    public ResponseEntity<?> deleteTask(@PathVariable Long departmentId, @PathVariable Long employeeId, @PathVariable Long taskId) {
        return takimetService.deleteTask(departmentId, employeeId, taskId);
    }

    @GetMapping(path = "/get/{departmentId}/{employeeId}/{taskId}")
    public ResponseEntity<?> getTask(@PathVariable Long departmentId, @PathVariable Long employeeId, @PathVariable Long taskId) {
        return new ResponseEntity<>(takimetService.getTask(departmentId, employeeId, taskId), HttpStatus.OK);
    }

    @GetMapping("/auth/user/{id}")
    public ResponseEntity<UserResponse> getUserDetails(@PathVariable("id") Long id) {
        UserResponse user = takimetService.getUserById(id);
        return ResponseEntity.status(HttpStatus.OK).body(user);
    }

    @GetMapping("/user-with-meetings/{userId}")
    public ResponseEntity<UserWithMeetings> getUserWithMeetings(@PathVariable Long userId) {
        UserWithMeetings userWithMeetings = takimetService.getUserWithMeetings(userId);
        return ResponseEntity.status(HttpStatus.OK).body(userWithMeetings);
    }
}