package org.makerminds.javaweb.service;

import java.util.List;
import java.util.Optional;

import org.makeminds.javaweb.Exeption.QytetiNotFoundException;
import org.makerminds.javaweb.Entity.Qyteti;
import org.makerminds.javaweb.repository.QytetiRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class QytetiService {

    private final QytetiRepository qytetiRepository;

    public Qyteti createQyteti(Qyteti qyteti) {
        return qytetiRepository.save(qyteti);
    }

    public Qyteti findById(Long id) {
        return qytetiRepository.findById(id).orElseThrow(() -> new QytetiNotFoundException("Qyteti not found"));
    }

    public List<Qyteti> getAllQytetet() {
        return qytetiRepository.findAll();
    }

    public ResponseEntity<?> deleteQytetiById(Long id) {
        Qyteti qyteti = qytetiRepository.findById(id).orElseThrow(() -> new QytetiNotFoundException("Qyteti not found"));
        qytetiRepository.delete(qyteti);
        String message = "Qyteti with ID " + id + " has been deleted";
        return ResponseEntity.ok().body(message);
    }
}
