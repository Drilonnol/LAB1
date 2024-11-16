package in.mahesh.tasks.response;

public class AdminResponse {
    private String message;
    private boolean status;

    // Getters dhe Setters
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