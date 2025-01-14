package org.makerminds.javaweb.service;

import org.makerminds.javaweb.Entity.Cv;
import org.makerminds.javaweb.Entity.Infermieret;
import org.makerminds.javaweb.repository.CvRepository;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CvService {

    private final CvRepository cvRepository;
    private final InfermieretService infermieretService;

    public Cv createNewCv(Cv newCv, Long employeeId, Long departmentId, Long repartiId, Long infermierertID) {
        Infermieret reparti = infermieretService.getMjke(departmentId, employeeId, repartiId, infermierertID);
        newCv.setInfermieret(reparti);
        return cvRepository.save(newCv);
    }

    public Cv updateCv(Long id, Cv updatedCv) {
        return cvRepository.findById(id).map(cv -> {
            cv.setName(updatedCv.getName());
            cv.setSurname(updatedCv.getSurname());
            cv.setEmail(updatedCv.getEmail());
            cv.setPhone(updatedCv.getPhone());
            cv.setAddress(updatedCv.getAddress());
            cv.setEducation(updatedCv.getEducation());
            cv.setExperience(updatedCv.getExperience());
            cv.setSkills(updatedCv.getSkills());
            cv.setInfermieret(updatedCv.getInfermieret());
            return cvRepository.save(cv);
        }).orElseThrow(() -> new RuntimeException("Cv not found with id " + id));
    }

    public List<Cv> getCvList() {
        return cvRepository.findAll();
    }

    public Cv getCv(Long id) {
        return cvRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cv not found with id " + id));
    }

    public List<Cv> getCvByInfermieretId(Long infermierertID) {
        return cvRepository.findByInfermieretId(infermierertID);
    }

    public void deleteCv(Long id) {
        cvRepository.deleteById(id);
    }
}
