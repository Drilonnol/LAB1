package org.makerminds.javaweb.repository;

import java.util.List;
import java.util.Optional;

import org.makerminds.javaweb.Entity.Cv;
import org.makerminds.javaweb.Entity.Takimet;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CvRepository extends JpaRepository<Cv, Long>{
	 Optional<Cv> findById(Long id);
	 List<Cv> findByInfermieretId(Long infermierertID);
}


