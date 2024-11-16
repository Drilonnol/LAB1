package org.makerminds.javaweb.service;



	import org.makerminds.javaweb.Entity.DosjaMejeksore;
import org.makerminds.javaweb.Entity.Mjeket;
import org.makerminds.javaweb.Entity.Pacienti;
import org.makerminds.javaweb.Entity.Receta;
import org.makerminds.javaweb.Entity.Takimet;
import org.makerminds.javaweb.repository.MjeketRepository;
import org.makerminds.javaweb.repository.RecetaRepository;
import org.springframework.beans.factory.annotation.Autowired;
	import org.springframework.stereotype.Service;

	import java.util.List;
	import java.util.Optional;

	@Service
	public class ReceptaServise {

	    private final RecetaRepository recetaRepository;
	    private final MjeketRepository mjekRepository;
	    private final MjeketService mjeketservice;
	   

	    @Autowired
	    public ReceptaServise(RecetaRepository recetaRepository, MjeketRepository mjekRepository, MjeketService mjeketservice) {
	        this.recetaRepository = recetaRepository;
	        this.mjekRepository = mjekRepository;
	        this.mjeketservice = mjeketservice;
	        
	    }

	    public Receta createNewReceta(Receta receta, Long mjekId) {
	        Mjeket mjek = mjekRepository.findById(mjekId).orElseThrow(() -> new RuntimeException("Mjek not found"));
	        receta.setEmployee(mjek);
	        return recetaRepository.save(receta);
	    }

	    public Receta getRecetaById(Long recetaId) {
	        return recetaRepository.findById(recetaId).orElseThrow(() -> new RuntimeException("Receta not found"));
	    }
	    public List<Receta> getTaskList(Long departamentiID, Long employeeID) {
	        return mjeketservice.getMjeket(departamentiID, employeeID).getRecetalist();
	    }
	    public Receta updateReceta(Long recetaId, Receta updatedReceta) {
	        Receta existingReceta = recetaRepository.findById(recetaId)
	                .orElseThrow(() -> new RuntimeException("Receta not found"));
	        existingReceta.setDataRecetes(updatedReceta.getDataRecetes());
	        existingReceta.setEmriIlacit(updatedReceta.getEmriIlacit());
	        existingReceta.setDoza(updatedReceta.getDoza());
	        existingReceta.setFrekuenca(updatedReceta.getFrekuenca());
	        existingReceta.setKohezgjatja(updatedReceta.getKohezgjatja());
	        existingReceta.setVerejtje(updatedReceta.getVerejtje());
	        return recetaRepository.save(existingReceta);
	    }

	    public void deleteReceta(Long recetaId) {
	        Receta receta = recetaRepository.findById(recetaId)
	                .orElseThrow(() -> new RuntimeException("Receta not found"));
	        recetaRepository.delete(receta);
	    }
	}


