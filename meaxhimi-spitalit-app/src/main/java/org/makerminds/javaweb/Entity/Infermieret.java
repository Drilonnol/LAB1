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
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="Infermieret")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Infermieret {
	
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name="infermieret_id")
    private long id;

    @NotBlank(message = "Email duhet te plotesohet!")
    @Column(name="infermieret_emri")
    private String emri;
    
    @NotBlank(message = "Email duhet te plotesohet!")
    @Column(name="infermieret_mbiemri")
    private String mbiemri;
    
    @NotBlank(message = "Email duhet te plotesohet!")
    @Column(name="infermieret_adress")
    private String adress;
    
    @ManyToOne(fetch = FetchType.EAGER) 
	@JoinColumn(name = "departmentId", nullable = false, updatable = false)
	private Reparti reparti;
    @JsonIgnore
    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy = "infermieret")
    private List<WorkExperience> workExperienceliste;
    @JsonIgnore
    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy = "infermieret")
    private List<Cv> cvliste;
    
    // Konstruktorët
    /*public Infermieret() {
    	super();
    }

    public Infermieret(long id, String emri, String mbiemri, String adress) {
        this.id = id;
        this.emri = emri;
        this.mbiemri = mbiemri;
        this.adress = adress;
        
    }

    // Metodat getter dhe setter
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getEmri() {
        return emri;
    }

    public void setEmri(String emri) {
        this.emri = emri;
    }

    public String getMbiemri() {
        return mbiemri;
    }

    public void setMbiemri(String mbiemri) {
        this.mbiemri = mbiemri;
    }

    public String getAdress() {
        return adress;
    }

    public void setAdress(String adress) {
        this.adress = adress;
    }*/
}

