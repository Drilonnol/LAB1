package in.mahesh.tasks.usermodel;

import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

import org.springframework.security.core.GrantedAuthority;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Access(AccessType.FIELD) 
@Table(name = "users")
public class User { 

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id; 

    private String fullName; 

    @Column(unique = true, nullable = false)
    private String email; 

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password; 


    private String role;

    private String mobile;
    private Collection<? extends GrantedAuthority> authorities;

}