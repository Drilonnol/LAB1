package org.makerminds.javaweb.repository;

import java.util.Optional;

import org.makerminds.javaweb.Entity.Infermieret;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InfermieretRepository extends JpaRepository<Infermieret, Long>{
	 Optional<Infermieret> findById(Long id);
}


