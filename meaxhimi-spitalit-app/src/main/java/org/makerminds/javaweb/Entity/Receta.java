package org.makerminds.javaweb.Entity;

import java.sql.Date;

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
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name="Receta")
public class Receta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "recepta_id")
    private Long id;
    @NotNull(message = "Name is dataRecetes")
	@Column(name = "dataRecetes",nullable = false)
    private Date dataRecetes;
    @NotBlank(message = "emriIlacit is requierd")
	@Column(name = "emriIlacit",nullable = false)
    private String emriIlacit;
    @NotBlank(message = "doza is requierd")
	@Column(name = "doza",nullable = false)
    private String doza;
    @NotBlank(message = "frekuenca is requierd")
	@Column(name = "frekuenca",nullable = false)
    private String frekuenca;
    @NotBlank(message = "kohezgjatja is requierd")
	@Column(name = "kohezgjatja",nullable = false)
    private String kohezgjatja;
    @NotBlank(message = "verejtje is requierd")
	@Column(name = "verejtje",nullable = false)
    private String verejtje;
    
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "mjekuId",updatable = false,nullable = false)
	private Mjeket employee;
   
    
    
}
