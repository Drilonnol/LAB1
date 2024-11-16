package org.makerminds.javaweb.service;

import java.util.List;

import org.makeminds.javaweb.Exeption.MjeketNotFoundExeption;
import org.makeminds.javaweb.Exeption.RepartiNotFoundException;
import org.makerminds.javaweb.Entity.Mjeket;
//import org.makerminds.javaweb.Entity.Mjeket;
import org.makerminds.javaweb.Entity.Pacienti;
import org.makerminds.javaweb.Entity.Reparti;
//import org.makerminds.javaweb.repository.MjeketRepository;
import org.makerminds.javaweb.repository.PacientiRepository;
import org.makerminds.javaweb.repository.RepartiRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

//import lombok.AllArgsConstructor;

@Service
//@AllArgsConstructor
public class PacinetiService {
	
	  private final PacientiRepository pacientetrepository;
	    private final RepartiRepository repartirepository;
	    private final RepartiService repartiservice;
	    
	    public PacinetiService(PacientiRepository pacientetrepository,RepartiRepository repartirepository,RepartiService repartiservice) {
	    	super();
	    	this.pacientetrepository=pacientetrepository;
	    	this.repartirepository=repartirepository;
	    	this.repartiservice=repartiservice;
	    }
	   
	    public Pacienti createpacient(Pacienti pacient,Long qytetiId,Long spitaliid,Long repartiid)
	    {
	    	Reparti employee= repartiservice.getTask(qytetiId, spitaliid,repartiid);
	    	
	    	pacient.setReparti(employee);
	    	return pacientetrepository.save(pacient);
	    	}
	    public Pacienti findMyId(Long id) {return pacientetrepository.findById(id).orElse(null);}
	    
	    
	    
	    public List<Pacienti> getMjeketList(Long qytetiId ,Long spitaliId,Long repartiId){	
	    	return repartiservice.getTask(qytetiId,spitaliId,repartiId).getPacientiliste();
	    	}
	    
	    /*public List<Pacienti> getMjeketList(Long repartiId){	
	    	return repartirepository.findById(repartiId).get().getPacientiliste();
	    	}
	    */
	    public ResponseEntity<?> deleteMjeketById(Long repartiId ,Long id){Pacienti mjeket = findMyId(id);
	    if(mjeket != null){
	    	if(mjeket.getReparti().getId() == repartiId) {
	    	
	    		pacientetrepository.delete(mjeket);
	    String massage = "Employee with id:" + mjeket.getId()+ "has been deleted";
	    return ResponseEntity.ok().body(massage);
	    
	    	}
	    	else {String massage = "Employee was not found";
	        throw new MjeketNotFoundExeption(massage);
	    		
	    	}
	    }
	    else{String massage = "Employee was not found";
	         throw new MjeketNotFoundExeption(massage);
	      }
	    } 
	 
	    public Pacienti getMjke(Long qytetiId, Long spitaliId, Long repartiId,Long pacinetId) {
	    	repartiservice.getTask(qytetiId, spitaliId,pacinetId);
	        Pacienti task = pacientetrepository.findById(pacinetId)
	                .orElseThrow(() -> new RepartiNotFoundException("Task not found"));
	        if (task.getReparti().getId() == repartiId) {
	            return task;
	        }
	        throw new RepartiNotFoundException("Task not found");
	    }
	    
	    public Pacienti getPacinet(Long repartiId,Long pacinetID) {
	    	
	    	Pacienti mjeket = findMyId(pacinetID);
	    	
	    	  if(mjeket == null ||mjeket.getReparti().getId() != repartiId ) {
	    		  throw new MjeketNotFoundExeption("Employe not found ");
	    	  }
	    
	    	return mjeket;
	    }
	}

