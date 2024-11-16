package org.makerminds.javaweb.service;

import org.makeminds.javaweb.Exeption.SpitaliNotFoundException;
import org.makerminds.javaweb.Entity.Spitali;
import org.makerminds.javaweb.repository.QytetiRepository;
import org.makerminds.javaweb.repository.SpitaliRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SpitaliService {
	

	    private final SpitaliRepository spitalirepository;
	    private final QytetiRepository repartirepository;
	    private final QytetiService repartiservice;
	    
	   
	    public Spitali teOrUpdateMjeket(Spitali spitalet,Long departmentId)
	    {
	    	spitalet.setQyteti(repartiservice.findById(departmentId));
	    	return spitalirepository.save(spitalet);
	    	}
	    

	    public Spitali findById(Long id) {return spitalirepository.findById(id).orElse(null);}
	   
	    
	    public List<Spitali> getSpitaliList(Long repartiId){	
	    	return repartirepository.findById(repartiId).get().getSpitalet();
	    	}
	    
	    public ResponseEntity<?> deleteMjeketById(Long repartiId ,Long id){Spitali spitalet = findById(id);
	    if(spitalet != null){
	    	if(spitalet.getQyteti().getId() == repartiId) {
	    	
	    		spitalirepository.delete(spitalet);
	    String massage = "Employee with id:" + spitalet.getId()+ "has been deleted";
	    return ResponseEntity.ok().body(massage);
	    
	    	}
	    	else {String massage = "Employee was not found";
	        throw new SpitaliNotFoundException(massage);
	    		
	    	}
	    }
	    else{String massage = "Employee was not found";
	         throw new SpitaliNotFoundException(massage);
	      }
	    } 
	 
	    public Spitali getSpitali(Long repartiId,Long mjeketID) {
	    	
	    	Spitali spitalet = findById(mjeketID);
	    	
	    	  if(spitalet == null ||spitalet.getQyteti().getId() != repartiId ) {
	    		  throw new SpitaliNotFoundException("Employe not found ");
	    	  }
	    
	    	return spitalet;
	    }
	    
	    public Spitali getSpitali1(Long repartiId) {
	    	
	    	Spitali spitalet = findById(repartiId);
	    	
	    	  if(spitalet == null ||spitalet.getQyteti().getId() != repartiId ) {
	    		  throw new SpitaliNotFoundException("Employe not found ");
	    	  }
	    
	    	return spitalet;
	    }
	}




