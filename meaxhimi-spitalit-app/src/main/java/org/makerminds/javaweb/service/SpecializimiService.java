package org.makerminds.javaweb.service;

import org.makerminds.javaweb.Entity.Mjeket;
import org.makerminds.javaweb.Entity.Specializimi;
import org.makerminds.javaweb.repository.MjeketRepository;
import org.makerminds.javaweb.repository.SpecializimiRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.lang.RuntimeException;

import java.util.List;
import java.util.Optional;

@Service
public class SpecializimiService {

    private final SpecializimiRepository specializimiRepository;
    private final MjeketRepository mjeketRepository;

    @Autowired
    public SpecializimiService(SpecializimiRepository specializimiRepository, MjeketRepository mjeketRepository) {
        this.specializimiRepository = specializimiRepository;
        this.mjeketRepository = mjeketRepository;
    }

    public Specializimi createNewSpecializimi(Specializimi specializimi, Long idMjeku) {
        Mjeket mjeku = mjeketRepository.findById(idMjeku)
                .orElseThrow(() -> new RuntimeException("Mjeku not found"));
        specializimi.setMjeket(mjeku);
        return specializimiRepository.save(specializimi);
    }

    public Specializimi findSpecializimiByMjekuId(Long idMjeku) {
        Mjeket mjeku = mjeketRepository.findById(idMjeku)
                .orElseThrow(() -> new RuntimeException("Mjeku not found"));
        return specializimiRepository.findByMjeket(mjeku)
                .orElseThrow(() -> new RuntimeException("Specializimi not found"));
    }

    public Specializimi updateSpecializimiByMjekuId(Long mjekuId, Specializimi updatedSpecializimi) {
        Mjeket mjeku = mjeketRepository.findById(mjekuId)
                .orElseThrow(() -> new RuntimeException("Mjeku not found"));

        Specializimi existingSpecializimi = specializimiRepository.findByMjeket(mjeku)
                .orElseThrow(() -> new RuntimeException("Specializimi not found"));

        existingSpecializimi.setEmri(updatedSpecializimi.getEmri());
        existingSpecializimi.setMjeket(mjeku);

        return specializimiRepository.save(existingSpecializimi);
    }

    public void deleteSpecializimiByMjekuId(Long mjekuId) {
        Mjeket mjeku = mjeketRepository.findById(mjekuId)
                .orElseThrow(() -> new RuntimeException("Mjeku not found"));
        Specializimi specializimi = specializimiRepository.findByMjeket(mjeku)
                .orElseThrow(() -> new RuntimeException("Specializimi not found"));
        specializimiRepository.delete(specializimi);
    }

    public List<Specializimi> getAllSpecializimet() {
        return specializimiRepository.findAll();
    }
}
