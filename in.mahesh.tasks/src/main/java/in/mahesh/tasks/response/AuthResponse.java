package in.mahesh.tasks.response;

import lombok.AllArgsConstructor; 
import lombok.NoArgsConstructor; 
  
@AllArgsConstructor
@NoArgsConstructor
public class AuthResponse { 
    private String jwt; 
    private String message; 
    private Boolean status; 
    private long id;
    public long getId() {
    	return id;
    }
  public void setId(long id) {
	  this.id=id;
  }
    public String getJwt() { 
        return jwt; 
    } 
  
    public void setJwt(String jwt) { 
        this.jwt = jwt; 
    } 
  
    public String getMessage() { 
        return message; 
    } 
  
    public void setMessage(String message) { 
        this.message = message; 
    } 
  
    public Boolean getStatus() { 
        return status; 
    } 
  
    public void setStatus(Boolean status) { 
        this.status = status; 
    }

	
} 