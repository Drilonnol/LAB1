package org.makerminds.javaweb.repository;

import java.util.Optional;


import org.makerminds.javaweb.Entity.Spitali;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SpitaliRepository extends JpaRepository<Spitali, Long>{
	 Optional<Spitali> findById(Long id);
}
