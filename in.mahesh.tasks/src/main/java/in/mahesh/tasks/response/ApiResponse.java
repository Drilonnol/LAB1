package in.mahesh.tasks.response;

import lombok.AllArgsConstructor; 
import lombok.Data; 
import lombok.NoArgsConstructor; 
  
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ApiResponse { 
    private String message; 
    private boolean status; 
    
    public String getMessage() { 
        return message; 
    } 
    public void setMessage(String message) { 
        this.message = message; 
    } 
    public boolean isStatus() { 
        return status; 
    } 
    public void setStatus(boolean b) { 
        this.status = b; 
    } 
  
} 
