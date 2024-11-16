package org.makerminds.javaweb.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name="alergjia")
public class Alergjia {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name ="id")
	private long id;
	
	@NotBlank( message="Emri i alergjis nuk duhet te jete i zrazet!" )
	@Column(name ="name", nullable = false)
	private String name;
	
	@NotBlank( message="shkaktari i alergjis nuk duhet te jete i zrazet!" )
	@Column(name ="shkaktari", nullable = false)
	private String shkaktari;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "pacineti_id", nullable = false, updatable = false )
	private Pacienti pacineti;
	
	
}
