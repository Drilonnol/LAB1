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
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name="pacineti")
public class Pacienti {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name ="id")
	private long id;
	
	@NotBlank( message="Emri nuk duhet te jete i zrazet!" )
	@Column(name ="name", nullable = false)
	private String name;
	
	@NotBlank(message="Adresa nuk duhet te jete i zbrazet!")
	@Column(name ="address", nullable = false)
	private String address;
	
	@NotBlank(message = "Email duhet te plotesohet!")
	@Email(message ="Formati i Email-it!!")
	@Column(name ="email",nullable = false)
	private String email;
	
	@NotBlank(message="Numri eshte i obligueshem")
	@Size(min=12, max=12, message="invalid phoneNumber")
	@Column(name="phoneNumber",nullable = false)
	private String phoneNumber;
	
	@NotBlank(message="Adresa nuk duhet te jete i zbrazet!")
	@Column(name ="gjinia", nullable = false)
	private String gjinia;
	
	@JsonIgnore
	@OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy = "pacineti")
	private List<Alergjia> alergjiList;
	
	@ManyToOne(fetch = FetchType.EAGER) 
	@JoinColumn(name = "departmentId", nullable = false, updatable = false)
	private Reparti reparti;
	
	@OneToOne(fetch = FetchType.EAGER, mappedBy = "pacienti")
	private DosjaMejeksore dosjaMejeksore;
	
}
