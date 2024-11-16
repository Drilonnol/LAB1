package org.makerminds.javaweb.Entity;

import java.util.List;

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
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name="specializimi")
public class Specializimi {
@Id
@GeneratedValue(strategy= GenerationType.IDENTITY)

@Column(name="specializimi_id")
private long id;

@NotBlank(message ="Emri i Qytetit duhet te plotesohet!")
@Column(name="qyteti_emri", nullable=false)
private String emri = "";

@JsonIgnore
@OneToOne(fetch = FetchType.LAZY)
@JoinColumn(name="id")
private Mjeket mjeket;

}
