package org.makerminds.javaweb.service;

import org.makerminds.javaweb.Entity.Infermieret;
import org.makerminds.javaweb.Entity.WorkExperience;
import org.makerminds.javaweb.repository.WorkExperienceRepository;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Service
@RequiredArgsConstructor
public class WorkExperienceService {

    private final WorkExperienceRepository workExperienceRepository;
    private final InfermieretService infermieretService;

    public WorkExperience createNewTakimet(WorkExperience newTask, Long employeeId, Long departmentId, Long repartiId, Long infermierertID) {
        Infermieret reparti = infermieretService.getMjke(departmentId, employeeId, repartiId, infermierertID);
        newTask.setInfermieret(reparti);
        return workExperienceRepository.save(newTask);
    }

    public WorkExperience updateWorkExperience(Long id, WorkExperience updatedWorkExperience) {
        return workExperienceRepository.findById(id).map(workExperience -> {
            workExperience.setPosition(updatedWorkExperience.getPosition());
            workExperience.setCompany(updatedWorkExperience.getCompany());
            workExperience.setStartDate(updatedWorkExperience.getStartDate());
            workExperience.setEndDate(updatedWorkExperience.getEndDate());
            workExperience.setInfermieret(updatedWorkExperience.getInfermieret());
            return workExperienceRepository.save(workExperience);
        }).orElseThrow(() -> new RuntimeException("WorkExperience not found with id " + id));
    }

    public List<WorkExperience> getWorkExperienceList() {
        return workExperienceRepository.findAll();
    }

    public WorkExperience getWorkExperience(Long id) {
        return workExperienceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("WorkExperience not found with id " + id));
    }

    public List<WorkExperience> getWorkExperiencesByInfermieretId(Long infermierertID) {
        return workExperienceRepository.findByInfermieretId(infermierertID);
    }

    public void deleteWorkExperience(Long id) {
        workExperienceRepository.deleteById(id);
    }
}
