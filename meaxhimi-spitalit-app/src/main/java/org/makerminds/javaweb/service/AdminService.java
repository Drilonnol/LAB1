package org.makerminds.javaweb.service;

import org.makerminds.javaweb.interfacee.UserClient;
import org.makerminds.javaweb.response.AdminCheckResponse;
import org.makerminds.javaweb.response.ApiResponse;
import org.makerminds.javaweb.response.CustomErrorDecoder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class AdminService {

    private final UserClient checkClient;

    @Autowired
    public AdminService(UserClient checkClient) {
        this.checkClient = checkClient;
    }

    public ApiResponse checkAdmin(String token) {
        try {
            ResponseEntity<AdminCheckResponse> response = checkClient.checkAdmin(token);
            AdminCheckResponse adminCheckResponse = response.getBody();
            if (adminCheckResponse != null && adminCheckResponse.isStatus()) {
                return new ApiResponse(adminCheckResponse.getMessage(), true); // Access granted
            } else {
                return new ApiResponse(adminCheckResponse != null ? adminCheckResponse.getMessage() : "Access denied.", false); // Access denied
            }
        } catch (CustomErrorDecoder.ForbiddenException e) {
            // Handle the forbidden exception
            return new ApiResponse("Access denied. You are not an admin.", false);
        }
    }
}