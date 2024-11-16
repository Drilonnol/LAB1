package org.makerminds.javaweb.response;

public class ApiResponse {
    private String message;
    private boolean status;

    // Constructors
    public ApiResponse() {}

    public ApiResponse(String message, boolean status) {
        this.message = message;
        this.status = status;
    }

    // Getters and setters
    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public boolean isStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }
}