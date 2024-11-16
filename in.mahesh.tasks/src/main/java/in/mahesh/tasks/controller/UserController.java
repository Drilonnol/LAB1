package in.mahesh.tasks.controller;


import in.mahesh.tasks.repository.UserRepository;
import in.mahesh.tasks.response.AdminResponse;
import in.mahesh.tasks.response.AuthResponse;
import in.mahesh.tasks.service.UserService;
import in.mahesh.tasks.service.UserServiceImplementation; 
import in.mahesh.tasks.SecurityConfig.JwtProvider;
import in.mahesh.tasks.usermodel.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

import java.util.List;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.HttpStatus; 
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.BadCredentialsException; 
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken; 
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder; 
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping; 
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController; 
  
@RestController
@RequestMapping("/auth")

@CrossOrigin
//@FeignClient(name = "meaxhimi-spitalit-app")
public class UserController {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private UserServiceImplementation customUserDetails;
    
     private User user;

     
     
     @GetMapping("/check")
     public ResponseEntity<AdminResponse> checkAdmin(@RequestHeader("Authorization") String authorizationHeader) {
         boolean isAdmin = JwtProvider.isAdmin(authorizationHeader);

         AdminResponse response = new AdminResponse();
         if (isAdmin) {
             response.setMessage("Access granted. You are an admin.");
             response.setStatus(true);
             return new ResponseEntity<>(response, HttpStatus.OK);
         } else {
             response.setMessage("Access denied. You are not an admin.");
             response.setStatus(false);
             return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
         }
     }
 
    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> createUserHandler(@RequestBody User user) {
        String email = user.getEmail();
        String password = user.getPassword();
        String fullName = user.getFullName();
        String mobile = user.getMobile();
        String role = user.getRole();

        User isEmailExist = userRepository.findByEmail(email);
        if (isEmailExist != null) {
            AuthResponse authResponse = new AuthResponse();
            authResponse.setMessage("Email is already used with another account");
            authResponse.setStatus(false);
            return new ResponseEntity<>(authResponse, HttpStatus.BAD_REQUEST);
        }

        User createdUser = new User();
        createdUser.setEmail(email);
        createdUser.setFullName(fullName);
        createdUser.setMobile(mobile);
        createdUser.setRole(role);
        createdUser.setPassword(passwordEncoder.encode(password));

        User savedUser = userRepository.save(createdUser);
        userRepository.save(savedUser);
        Authentication authentication = new UsernamePasswordAuthenticationToken(email, password);
        SecurityContextHolder.getContext().setAuthentication(authentication);
 
        String token = JwtProvider.generateToken(authentication,role);

        AuthResponse authResponse = new AuthResponse();
        authResponse.setJwt(token);
        authResponse.setMessage("Register Success");
        authResponse.setStatus(true);
        return new ResponseEntity<>(authResponse, HttpStatus.OK);
    }
    @GetMapping("user/{userId}")
    public ResponseEntity<User> getUserById(@PathVariable Long userId) {
        User user = customUserDetails.findUserById(userId);
        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
 
    
    @GetMapping("user/all")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = customUserDetails.findAllUsers();
        return ResponseEntity.ok(users);
    }
    @PostMapping("/signin")
    public ResponseEntity<AuthResponse> signin(@RequestBody User loginRequest) {
        String username = loginRequest.getEmail();
        String password = loginRequest.getPassword();

        Authentication authentication = authenticate(username, password);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        User user = userRepository.findByEmail(userDetails.getUsername());
        if (user == null) {
            throw new UsernameNotFoundException("User not found");
        }

        String role = user.getRole(); 
        String token = JwtProvider.generateToken(authentication, role);
        AuthResponse authResponse = new AuthResponse();

        authResponse.setMessage("Login success");
        authResponse.setJwt(token);
        authResponse.setStatus(true);
        authResponse.setId(user.getId());
        return new ResponseEntity<>(authResponse, HttpStatus.OK);
    }


    @PostMapping("/verifyToken")
    public ResponseEntity<Boolean> verifyToken(@RequestHeader("Authorization") String tokenHeader) {
        if (tokenHeader != null && tokenHeader.startsWith("Bearer ")) {
            String token = tokenHeader.substring(7);
            boolean isValid = JwtProvider.validateToken(token);
            return new ResponseEntity<>(isValid, isValid ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
        } else {
            return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
        }
    }
    

  
    private Authentication authenticate(String username, String password) {
        System.out.println(username + "---++----" + password);

        UserDetails userDetails = customUserDetails.loadUserByUsername(username);

        System.out.println("Sign in user details" + userDetails);

        if (userDetails == null) {
            System.out.println("Sign in details - null" + userDetails);

            throw new BadCredentialsException("Invalid username and password");
        }
        if (!passwordEncoder.matches(password, userDetails.getPassword())) {
            System.out.println("Sign in userDetails - password mismatch" + userDetails);

            throw new BadCredentialsException("Invalid password");
        }
        return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
    }
}