package org.makerminds.javaweb.repository;

import java.util.Optional;

import org.makerminds.javaweb.Entity.Reparti;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RepartiRepository extends JpaRepository<Reparti, Long> {
    Optional<Reparti> findById(Long id);
}