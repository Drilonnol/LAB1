package org.makerminds.javaweb.response;

import feign.Response;
import feign.codec.ErrorDecoder;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class CustomErrorDecoder implements ErrorDecoder {


    private final ErrorDecoder defaultErrorDecoder = new Default();

    @Override
    public Exception decode(String methodKey, Response response) {
        if (response.status() == HttpStatus.FORBIDDEN.value()) {
            // Handle the 403 Forbidden response
            return new ForbiddenException("Access denied. You are not an admin.");
        } else if (response.status() == HttpStatus.INTERNAL_SERVER_ERROR.value()) {
            // Handle the 500 Internal Server Error response
            // Example: Log the response body for debugging
            System.out.println(response.body());
        }

        // Delegate to default error decoder for other status codes
        return defaultErrorDecoder.decode(methodKey, response);
    }

    // Custom exception for Forbidden status
    public static class ForbiddenException extends RuntimeException {
        public ForbiddenException(String message) {
            super(message);
        }
    }
}