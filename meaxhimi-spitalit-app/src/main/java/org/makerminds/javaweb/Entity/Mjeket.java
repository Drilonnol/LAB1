package org.makerminds.javaweb.Entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "Mjeket")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Mjeket {
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
@Column(name = "id")
private long id;
@NotBlank(message = "Name is requierd")
@Column(name = "name",nullable = false)
private String name;
@NotBlank(message = "addres is required")
@Column(name = "address",nullable = false)
private String address;
@NotBlank(message = "Email is requered")
@Email (message = "addres is required")
@Column(name = "email",nullable = false)
private String email;
@NotBlank (message = "Phone numer is required")
@Size(min = 12,max = 12,message = "Invali phone numer")
@Column(name = "phoneNumber",nullable = false)
private String phoneNumber;

@ManyToOne(fetch = FetchType.EAGER)
@JoinColumn(name = "departmentId", nullable = false, updatable = false)
private Reparti reparti;

@OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy = "employee")
@JsonIgnore
private List<Takimet> takimetlist;

@OneToMany(fetch = FetchType.LAZY, cascade = { CascadeType.PERSIST, CascadeType.MERGE }, mappedBy = "employee")
@JsonIgnore
private List<Receta> recetalist;

@OneToOne(fetch = FetchType.EAGER, mappedBy = "mjeket", cascade = CascadeType.ALL)
private Specializimi specializimi;


}