package org.makerminds.javaweb.interfacee;



import java.util.List;

import org.makerminds.javaweb.response.AdminCheckResponse;
import org.makerminds.javaweb.response.UserResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;

import feign.RequestLine;

@FeignClient(name = "in.mahesh.tasks", url = "http://192.168.1.15:8083/in.mahesh.tasks")

public interface UserClient {

   
	    @GetMapping("/auth/user/{id}")
	    ResponseEntity<UserResponse> getUserById(@PathVariable("id") Long id);
	    
	    @GetMapping("/auth/user/all")
	    ResponseEntity<List<UserResponse>> getAllUsers();
	    

	    @GetMapping("/auth/check")
	    ResponseEntity<AdminCheckResponse> checkAdmin(@RequestHeader("Authorization") String token);
	    
	}