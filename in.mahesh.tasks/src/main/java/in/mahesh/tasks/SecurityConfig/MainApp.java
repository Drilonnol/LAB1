package in.mahesh.tasks.SecurityConfig;
import org.springframework.security.core.Authentication;

import in.mahesh.tasks.usermodel.User;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;


	public class MainApp {
		  public static void main(String[] args) {
		        String jwtAdmin = "Bearer eyJhbGciOiJIUzM4NCJ9.eyJpYXQiOjE3MTg1Mjc3MjEsImV4cCI6MTcxODYxNDEyMSwiZW1haWwiOiJhYWRzc3Ntc3Nzc2RuZHNzaXNzaW56QGV4YW1wbGUuY29tIiwicm9sZSI6ImFkbWluIn0.7t4KaElc4fsw-JOrNcpCL8SV3MTRpZNTJV0eDm9sKEP11m5pboAmsdRWtbGbG9tw";
		       

		        boolean isAdminAdmin = JwtProvider.isAdmin(jwtAdmin);
		   

		        System.out.println("Is admin based on admin JWT: " + isAdminAdmin); // Kthehet true
		      
		    }
}