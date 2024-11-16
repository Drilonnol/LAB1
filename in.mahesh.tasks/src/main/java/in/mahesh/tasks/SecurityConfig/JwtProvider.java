package in.mahesh.tasks.SecurityConfig;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.HttpServletRequest;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import in.mahesh.tasks.usermodel.User;

import javax.crypto.SecretKey;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class JwtProvider { 
    static SecretKey key = Keys.hmacShaKeyFor(JwtConstant.SECRET_KEY.getBytes()); 

    public static String generateToken(Authentication auth, String role) {
        String jwt = Jwts.builder()
                .setIssuedAt(new Date())
                .setExpiration(new Date(new Date().getTime() + 86400000))
                .claim("email", auth.getName())
                .claim("role", role)  // Përdorimi i atributit "role" në vend të "authorities"
                .signWith(key)
                .compact();
        System.out.println("Token for parsing in JwtProvider: " + jwt);
        return jwt;
    }
    
    private static String populateAuthorities(Authentication auth) {
        Set<String> auths = new HashSet<>();
        if (auth.getPrincipal() instanceof User) {
            User user = (User) auth.getPrincipal();
            auths.add(user.getRole());
        } else {
            Collection<? extends GrantedAuthority> authorities = auth.getAuthorities();
            for (GrantedAuthority authority : authorities) {
                auths.add(authority.getAuthority());
            }
        }
        return String.join(",", auths);
    }
    
    public static String getEmailFromJwtToken(String jwt) { 
        try { 
            if (jwt != null && jwt.startsWith("Bearer ")) {
                jwt = jwt.substring(7); // Remove "Bearer " prefix
            }
            Claims claims = Jwts.parserBuilder()
                                .setSigningKey(key)
                                .build()
                                .parseClaimsJws(jwt)
                                .getBody(); 
            String email = String.valueOf(claims.get("email")); 
            System.out.println("Email extracted from JWT: " + email); 
            return email; 
        } catch (Exception e) { 
            System.err.println("Error extracting email from JWT: " + e.getMessage()); 
            e.printStackTrace(); 
            return null; 
        } 
    } 
    
    public static boolean validateToken(String token) {
        try {
            if (token != null && token.startsWith("Bearer ")) {
                token = token.substring(7); // Remove "Bearer " prefix
            }
            Claims claims = Jwts.parserBuilder()
                                .setSigningKey(key)
                                .build()
                                .parseClaimsJws(token)
                                .getBody();
            return true;
        } catch (Exception e) {
            return false;
        }
    }
    
    public static boolean isAdmin(String jwt) {
        try {
          
            if (jwt != null && jwt.startsWith("Bearer ")) {
                jwt = jwt.substring(7);
            }

      
            Claims claims = Jwts.parserBuilder()
                                .setSigningKey(key)
                                .build()
                                .parseClaimsJws(jwt)
                                .getBody();

         
            String role = String.valueOf(claims.get("role"));
            return "admin".equals(role);
        } catch (Exception e) {
            return false;
        }
    }

    public static String resolveToken(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }
    public static UsernamePasswordAuthenticationToken getAuthentication(String token) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();

        String email = String.valueOf(claims.get("email"));
        String role = String.valueOf(claims.get("role"));

        List<SimpleGrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority("ROLE_" + role));

        User user = new User(); 
        user.setEmail(email);
        user.setPassword(""); 
        user.setAuthorities(authorities);

        return new UsernamePasswordAuthenticationToken(user, token, authorities);
    }
}
