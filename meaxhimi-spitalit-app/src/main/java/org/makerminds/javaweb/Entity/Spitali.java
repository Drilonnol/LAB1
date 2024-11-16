package org.makerminds.javaweb.Entity;

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

@Entity
@Table(name = "Spitali")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Spitali {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "spitali_id")
    private long id;

    @NotBlank(message = "Emri i spitalit duhet të plotesohet!")
    @Column(name = "emri", nullable = false)
    private String emri;

    @NotBlank(message = "Adresa e spitalit duhet të plotesohet!")
    @Column(name = "adressa")
    private String adressa;

    @NotBlank(message = "Numri i telefonit duhet të plotesohet!")
    @Column(name = "phoneNumber", nullable = false)
    private String phoneNumber;

    @NotBlank(message = "Email i spitalit duhet të plotesohet!")
    @Column(name = "email", nullable = false)
    private String email;

    @ManyToOne(fetch = FetchType.EAGER) 
    @JoinColumn(name = "qyteti_id") 
    private Qyteti qyteti;
    
    @JsonIgnore 
    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy = "spitali") 
    private List<Reparti> repartet;  
    
   /* @JsonIgnore
   	@OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy = "spitali")
   	private List<Reparti> repartiiList;*/
    
    
    
}


















/*import java.util.List;

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

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "spitali")
public class Spitali {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "spitali_id")
    private long id;

    @NotBlank(message = "Emri i spitalit duhet të plotesohet!")
    @Column(name = "emri", nullable = false)
    private String emri;

    @NotBlank(message = "Adresa e spitalit duhet të plotesohet!")
    @Column(name = "adresa", nullable = false)
    private String adresa;

    @NotBlank(message = "Numri i telefonit duhet të plotesohet!")
    @Column(name = "phoneNumber", nullable = false)
    private String phoneNumber;

    @NotBlank(message = "Email i spitalit duhet të plotesohet!")
    @Column(name = "email", nullable = false)
    private String email;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "qyteti_id", nullable = false, updatable = false)
    private Qyteti qyteti;

    @JsonIgnore
    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy = "spitali")
    private List<Reparti> repartiliste;
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

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name="spitali")
public class Spitali {
	
	@Id
	@GeneratedValue(strategy= GenerationType.IDENTITY)
	
	@Column(name="spitali_id")
	private long id;
	
	@NotBlank(message ="Emri i spitalit duhet te plotesohet!")
	@Column(name="emri", nullable=false)
	private String emri;
	
	@NotBlank(message ="Adressa i spitalit duhet te plotesohet!")
	@Column(name="adressa", nullable=false)
	private String adressa;
	
	@NotBlank(message ="Numri i spitalit duhet te plotesohet!")
	@Column(name="phoneNumber", nullable=false)
	private String phoneNumber;
	
	@NotBlank(message ="Email i spitalit duhet te plotesohet!")
	@Column(name="email", nullable=false)
	private String email;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "qyteti_id", nullable = false, updatable = false )
	private Qyteti qyteti;
	
	@JsonIgnore
	@OneToMany(fetch = FetchType.LAZY ,cascade = CascadeType.ALL, mappedBy = "spitali")
	private List<Reparti> repartiliste; 
}*/
