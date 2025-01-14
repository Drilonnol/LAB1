package org.makerminds.javaweb.repository;


import java.util.List;
import java.util.Optional;

import org.makerminds.javaweb.Entity.WorkExperience;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WorkExperienceRepository extends JpaRepository<WorkExperience, Long>{
	 Optional<WorkExperience> findById(Long id);
	 List<WorkExperience> findByInfermieretId(Long infermierertID);

}
