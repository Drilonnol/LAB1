package in.mahesh.tasks.service;

import java.util.List;


import org.springframework.stereotype.Service;

import in.mahesh.tasks.usermodel.User;

@Service
public interface UserService{
	

     
     public User findUserProfileByJwt(String jwt); 
       
     public User findUserByEmail(String email) ; 
       
     public User findUserById(Long userId) ; 
     
     public List<User> findAllUsers();

	   public void signout();
}
