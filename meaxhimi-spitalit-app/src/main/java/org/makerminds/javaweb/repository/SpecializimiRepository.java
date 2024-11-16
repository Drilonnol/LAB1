package org.makerminds.javaweb.repository;

import java.util.Optional;

import org.makerminds.javaweb.Entity.Mjeket;
import org.makerminds.javaweb.Entity.Specializimi;

import org.springframework.data.jpa.repository.JpaRepository;

public interface SpecializimiRepository extends JpaRepository<Specializimi, Long> {
    Optional<Specializimi> findById(Long id);

	Optional<Specializimi> findByMjeket(Mjeket mjeku);
}