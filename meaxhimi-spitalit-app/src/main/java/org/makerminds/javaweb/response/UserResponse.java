package org.makerminds.javaweb.response;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Column;
import lombok.Data;

@Data
public class UserResponse {
	private long id; 

    private String fullName; 

    
    private String email; 

  
    private String password; 

    private String role; 

  
    private String mobile;
}


