package org.makerminds.javaweb.service;

import java.util.List;

import org.makeminds.javaweb.Exeption.MjeketNotFoundExeption;
import org.makeminds.javaweb.Exeption.RepartiNotFoundException;
import org.makerminds.javaweb.Entity.Infermieret;
import org.makerminds.javaweb.Entity.Mjeket;
import org.makerminds.javaweb.Entity.Pacienti;
import org.makerminds.javaweb.Entity.Reparti;
import org.makerminds.javaweb.repository.InfermieretRepository;
import org.makerminds.javaweb.repository.MjeketRepository;
import org.makerminds.javaweb.repository.RepartiRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
@Service

@AllArgsConstructor

public class InfermieretService {
	private final InfermieretRepository infermieretrepository;
    private final RepartiRepository repartirepository;
    private final RepartiService repartiservice;
    
   
    public Infermieret teOrUpdateMjeket(Infermieret mjeket,Long qytetiId,Long spitaliid,Long repartiid)
    {
    	Reparti employee= repartiservice.getTask(qytetiId, spitaliid,repartiid);
    	
    	mjeket.setReparti(employee);
    	return infermieretrepository.save(mjeket);
    	}
    

    public Infermieret findMyId(Long id) {return infermieretrepository.findById(id).orElse(null);}
   
    
    public List<Infermieret> getMjeketList(Long qytetiId ,Long spitaliId,Long repartiId){	
    	return repartiservice.getTask(qytetiId,spitaliId,repartiId).getInfermieriliste();
    	}
   /* public List<Infermieret> getMjeketList(Long repartiId){	
    	return repartirepository.findById(repartiId).get().getInfermieriliste();
    	}*/
    
    public ResponseEntity<?> deleteMjeketById(Long repartiId ,Long id){Infermieret mjeket = findMyId(id);
    if(mjeket != null){
    	if(mjeket.getReparti().getId() == repartiId) {
    	
    		infermieretrepository.delete(mjeket);
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
 
    public Infermieret getMjke(Long qytetiId, Long spitaliId, Long repartiId,Long infermieretId) {
    	repartiservice.getTask(qytetiId, spitaliId,infermieretId);
        Infermieret task = infermieretrepository.findById(infermieretId)
                .orElseThrow(() -> new RepartiNotFoundException("Task not found"));
        if (task.getReparti().getId() == repartiId) {
            return task;
        }
        throw new RepartiNotFoundException("Task not found");
    }

}
