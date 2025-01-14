package org.makerminds.javaweb.service;

import org.makerminds.javaweb.Entity.Certification;
import org.makerminds.javaweb.Entity.Infermieret;
import org.makerminds.javaweb.repository.CertificationRepository;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CertificationService {

    private final CertificationRepository certificationRepository;
    private final InfermieretService infermieretService;

    public Certification createNewCertification(Certification newCertification, Long employeeId, Long departmentId, Long repartiId, Long infermierertID) {
        Infermieret infermier = infermieretService.getMjke(departmentId, employeeId, repartiId, infermierertID);
        newCertification.setInfermier(infermier);
        return certificationRepository.save(newCertification);
    }

    public Certification updateCertification(Long id, Certification updatedCertification) {
        return certificationRepository.findById(id).map(certification -> {
            certification.setName(updatedCertification.getName());
            certification.setIssueDate(updatedCertification.getIssueDate());
            certification.setExpiryDate(updatedCertification.getExpiryDate());
            certification.setIssuer(updatedCertification.getIssuer());
            certification.setInfermier(updatedCertification.getInfermier());
            return certificationRepository.save(certification);
        }).orElseThrow(() -> new RuntimeException("Certification not found with id " + id));
    }

    public List<Certification> getCertificationList() {
        return certificationRepository.findAll();
    }

    public Certification getCertification(Long id) {
        return certificationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Certification not found with id " + id));
    }

    public List<Certification> getCertificationByInfermierId(Long infermierId) {
        return certificationRepository.findByInfermierId(infermierId);
    }

    public void deleteCertification(Long id) {
        certificationRepository.deleteById(id);
    }
}
