package org.makerminds.javaweb.repository;

import java.util.Optional;

import org.makerminds.javaweb.Entity.DosjaMejeksore;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DosjaMejeksoreRepository extends JpaRepository<DosjaMejeksore, Long>{
	 Optional<DosjaMejeksore> findById(Long id);
}
