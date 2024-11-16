
package org.makerminds.javaweb.service;

import org.makerminds.javaweb.Entity.DosjaMejeksore;
import org.makerminds.javaweb.Entity.Pacienti;
import org.makerminds.javaweb.repository.DosjaMejeksoreRepository;
import org.makerminds.javaweb.repository.PacientiRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DosjaMejeksoreService {

    private final DosjaMejeksoreRepository dosjaMejeksoreRepository;
    private final PacientiRepository pacientiRepository;

    @Autowired
    public DosjaMejeksoreService(DosjaMejeksoreRepository dosjaMejeksoreRepository, PacientiRepository pacientiRepository) {
        this.dosjaMejeksoreRepository = dosjaMejeksoreRepository;
        this.pacientiRepository = pacientiRepository;
    }

    public DosjaMejeksore createNewDosjaMejeksore(DosjaMejeksore dosjaMejeksore, Long pacientiId) {
        Pacienti pacienti = pacientiRepository.findById(pacientiId).orElseThrow(() -> new RuntimeException("Pacienti not found"));
        dosjaMejeksore.setPacienti(pacienti);
        return dosjaMejeksoreRepository.save(dosjaMejeksore);
    }

    public DosjaMejeksore getDosjaMejeksoreByPacientiId(Long pacientiId) {
        return dosjaMejeksoreRepository.findById(pacientiId).orElseThrow(() -> new RuntimeException("Dosja mjeksore not found"));
    }

    public DosjaMejeksore updateDosjaMejeksore(Long dosjaId, DosjaMejeksore updatedDosjaMejeksore) {
        DosjaMejeksore existingDosjaMejeksore = dosjaMejeksoreRepository.findById(dosjaId)
                .orElseThrow(() -> new RuntimeException("Dosja mjeksore not found"));
        existingDosjaMejeksore.setHistoria(updatedDosjaMejeksore.getHistoria());
        existingDosjaMejeksore.setGjatesia(updatedDosjaMejeksore.getGjatesia());
        existingDosjaMejeksore.setPesha(updatedDosjaMejeksore.getPesha());
        return dosjaMejeksoreRepository.save(existingDosjaMejeksore);
    }

    public void deleteDosjaMejeksore(Long dosjaId) {
        DosjaMejeksore dosjaMejeksore = dosjaMejeksoreRepository.findById(dosjaId)
                .orElseThrow(() -> new RuntimeException("Dosja mjeksore not found"));
        dosjaMejeksoreRepository.delete(dosjaMejeksore);
    }
}
