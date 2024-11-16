package org.makerminds.javaweb.Entity;

import org.apache.logging.log4j.message.MapMessage.MapFormat;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name="dosjaMjeksore")
public class DosjaMejeksore {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "dosja_id")
	private long id;
	
	@NotBlank(message = "hsitoriku is requierd")
	@Column(name = "historia",nullable = false)
	private String historia;
	
	@NotBlank(message = "Gjateisa is requierd")
	@Column(name = "gjatesia",nullable = false)
	private String gjatesia;
	
	@NotBlank(message = "Pesha is requierd")
	@Column(name = "pesha",nullable = false)
	private String pesha;
	 
	@JsonIgnore
	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="id")
	private Pacienti pacienti;
}
