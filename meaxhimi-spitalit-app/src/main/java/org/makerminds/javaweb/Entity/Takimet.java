package org.makerminds.javaweb.Entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;



@Entity
    @Table(name = "Takimet")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Takimet {
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  private long id;
@NotBlank(message = "Description is required")
//@Max(value = 256)
  private String description;
@NotBlank(message = "acceptanceCriteria is required")
//@Max(value = 256)
  private String acceptanceCriteria;
@NotBlank(message = "status is required")
  private String status;
//@NotBlank(message = "priority is required")
@Positive(message = "Priority should be positive number0")
@Min(value = 1, message = "minimal value priority")
@Max(value = 3, message = "maximal value priority")
  private int priority;

private long userId;
 
@ManyToOne(fetch = FetchType.EAGER)
@JoinColumn(name = "mjekuId",updatable = false,nullable = false)
private Mjeket employee;
}