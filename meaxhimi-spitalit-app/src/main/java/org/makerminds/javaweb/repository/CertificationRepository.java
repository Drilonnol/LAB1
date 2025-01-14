package org.makerminds.javaweb.repository;

import java.util.List;
import java.util.Optional;

import org.makerminds.javaweb.Entity.Certification;
import org.makerminds.javaweb.Entity.WorkExperience;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CertificationRepository  extends JpaRepository<Certification, Long>{
	 Optional<Certification> findById(Long id);
	 List<Certification> findByInfermierId(Long infermierId);
}
