package org.makerminds.javaweb.repository;

import java.util.Optional;

import org.makerminds.javaweb.Entity.Mjeket;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MjeketRepository extends JpaRepository<Mjeket, Long>{
	 Optional<Mjeket> findById(Long id);
}
