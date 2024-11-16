package org.makerminds.javaweb.repository;

import java.util.Optional;

import org.makerminds.javaweb.Entity.Receta;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RecetaRepository  extends JpaRepository<Receta, Long> {
    Optional<Receta> findById(Long id);
}