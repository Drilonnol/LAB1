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

@Entity
@Table(name = "certification")
public class Certification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "certification_id")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "issue_date")
    private String issueDate;

    @Column(name = "expiry_date")
    private String expiryDate;

    @Column(name = "issuer")
    private String issuer;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "infermier_id", nullable = false)
    private Infermieret infermier;

    // Constructors
    public Certification() {}

    public Certification(Long id, String name, String issueDate, String expiryDate, String issuer, Infermieret infermier) {
        this.id = id;
        this.name = name;
        this.issueDate = issueDate;
        this.expiryDate = expiryDate;
        this.issuer = issuer;
        this.infermier = infermier;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getIssueDate() {
        return issueDate;
    }

    public void setIssueDate(String issueDate) {
        this.issueDate = issueDate;
    }

    public String getExpiryDate() {
        return expiryDate;
    }

    public void setExpiryDate(String expiryDate) {
        this.expiryDate = expiryDate;
    }

    public String getIssuer() {
        return issuer;
    }

    public void setIssuer(String issuer) {
        this.issuer = issuer;
    }

    public Infermieret getInfermier() {
        return infermier;
    }

    public void setInfermier(Infermieret infermier) {
        this.infermier = infermier;
    }
}
