package org.makerminds.javaweb.repository;

import java.util.List;
import java.util.Optional;

import org.makerminds.javaweb.Entity.Takimet;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TakimetRepository extends JpaRepository<Takimet, Long>{
	 Optional<Takimet> findById(Long id);
	 List<Takimet> findByUserId(Long userId);
}


