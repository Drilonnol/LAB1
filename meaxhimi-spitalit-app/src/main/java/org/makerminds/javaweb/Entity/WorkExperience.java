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
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "work_experience")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class WorkExperience {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "experience_id")
    private Long id;

    @Column(name = "position")
    private String position;

    @Column(name = "company")
    private String company;

    @Column(name = "start_date")
    private String startDate;

    @Column(name = "end_date")
    private String endDate;
   @ManyToOne(fetch = FetchType.EAGER) 
  	@JoinColumn(name = "departmentId", nullable = false, updatable = false)
  	private Infermieret infermieret; 

    // Konstruktorët
    /*public WorkExperience() {
    }

    public WorkExperience(String position, String company, String startDate, String endDate) {
        this.position = position;
        this.company = company;
        this.startDate = startDate;
        this.endDate = endDate;
    }

    // Getter dhe Setter
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public String getCompany() {
        return company;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public String getStartDate() {
        return startDate;
    }

    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }

    public String getEndDate() {
        return endDate;
    }

    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }*/
}
