
package org.makerminds.javaweb.Entity;

import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "Reparti")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Reparti {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "repartipk")
    private long id;

    @NotBlank(message = "the repart name is required")
    @Column(name = "Emri", nullable = false)
    private String name;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "spitalid", nullable = false) 
    private Spitali spitali; 
    
    @JsonIgnore
    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy = "reparti")
    private List<Mjeket> mjeketliste;

    @JsonIgnore
    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy = "reparti")
    private List<Pacienti> pacientiliste;
    @JsonIgnore
    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy = "reparti")
    private List<Infermieret> infermieriliste;

    /*@ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "spitali_id", nullable = false, updatable = false)
    private Spitali spitali;*/
    
}




/*package org.makerminds.javaweb.Entity;

import java.util.List;


import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.makerminds.javaweb.Entity.Mjeket;
@Entity
  @Table(name = "Reparti")
  @Data
  @NoArgsConstructor
  @AllArgsConstructor
   public class Reparti  {
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
   @Column(name = "repartipk")
   private long id;
@NotBlank( message = "the repart name is request")
   @Column(name = "Emri",nullable = false)
   private String name;

@JsonIgnore
@OneToMany(fetch = FetchType.LAZY ,cascade = CascadeType.ALL, mappedBy = "reparit")
private List<Mjeket> mjeketliste; 

@JsonIgnore
@OneToMany(fetch = FetchType.LAZY ,cascade = CascadeType.ALL, mappedBy = "reparit")
private List<Pacienti> pacientiliste; 


@ManyToOne(fetch = FetchType.EAGER)
@JoinColumn(name = "spitali_id", nullable = false)
private Spitali spitali;

 

}*/