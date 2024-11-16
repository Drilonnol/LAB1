package in.mahesh.tasks.service;

import in.mahesh.tasks.repository.UserRepository;
import in.mahesh.tasks.usermodel.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserServiceImplementation implements UserDetailsService,UserService{

    private final UserRepository userRepository;

    @Autowired
    public UserServiceImplementation(UserRepository userRepository) {
        this.userRepository = userRepository;
       
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(username);

        if (user == null) {
            throw new UsernameNotFoundException("User not found with email: " + username);
        }

        System.out.println("Loaded user: " + user.getEmail() + ", Role: " + user.getRole());
        System.out.println("Password: " + user.getPassword());
        List<GrantedAuthority> authorities = new ArrayList<>();
        return new org.springframework.security.core.userdetails.User(
                user.getEmail(),
                user.getPassword(),
                authorities);
    }
  
    
    @Override
    public User findUserProfileByJwt(String jwt) {
        // Implement your logic to find a user by JWT
        // Example (assuming JWT contains email):
        String email = extractEmailFromJwt(jwt);
        return findUserByEmail(email);
    }

    private String extractEmailFromJwt(String jwt) {
        // Placeholder for JWT email extraction logic
        return "extractedEmail@example.com"; // Replace with actual extraction logic
    }

    @Override
    public User findUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public User findUserById(Long userId) {
        return userRepository.findById(userId).orElse(null);
    }
    
    @Override
    public void signout() {
        SecurityContextHolder.clearContext();
    }

    @Override
    public List<User> findAllUsers() {
        return userRepository.findAll();
    }

	
  
}
