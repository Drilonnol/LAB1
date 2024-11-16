package org.makerminds.javaweb.service;

import java.util.List;
import java.util.Optional;

import org.makeminds.javaweb.Exeption.MjeketNotFoundExeption;
import org.makeminds.javaweb.Exeption.RepartiNotFoundException;
import org.makerminds.javaweb.Entity.Mjeket;
import org.makerminds.javaweb.Entity.Reparti;
import org.makerminds.javaweb.Entity.Spitali;
import org.makerminds.javaweb.interfacee.UserClient;
import org.makerminds.javaweb.repository.MjeketRepository;
import org.makerminds.javaweb.repository.RepartiRepository;
import org.makerminds.javaweb.response.AdminCheckResponse;
import org.makerminds.javaweb.response.CustomErrorDecoder;
import org.makerminds.javaweb.response.UserResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;



@Service

@AllArgsConstructor
public class MjeketService {

    private final MjeketRepository mjeketrepository;
    private final RepartiRepository repartirepository;
    private final RepartiService repartiservice;
    private final UserClient userclient;
   /* @Autowired
    private UserClient userClient;

    public UserResponse getUserById(Long id) {
        ResponseEntity<UserResponse> userResponse = userClient.getUserById(id);
        return userResponse.getBody();
    }
    public List<UserResponse> getAllUsers() {
        ResponseEntity <List<UserResponse>> userResponse = userClient.getAllUsers();
        return userResponse.getBody();
    }*/
    
   /* public String checkAdmin(String token) {
        ResponseEntity<String> response = userclient.checkAdmin(token);
        return response.getBody();
    }*/

    
    public Mjeket teOrUpdateMjeket(Mjeket mjeket,Long qytetiId,Long spitaliid,Long repartiid)
    {
    	Reparti employee= repartiservice.getTask(qytetiId, spitaliid,repartiid);
    	
    	mjeket.setReparti(employee);
    	return mjeketrepository.save(mjeket);
    	}
    

    public Mjeket findMyId(Long id) {return mjeketrepository.findById(id).orElse(null);}
   
    
    public List<Mjeket> getMjeketList(Long qytetiId ,Long spitaliId,Long repartiId){	
    	return repartiservice.getTask(qytetiId,spitaliId,repartiId).getMjeketliste();
    	}
    
    public ResponseEntity<?> deleteMjeketById(Long repartiId ,Long id){Mjeket mjeket = findMyId(id);
    if(mjeket != null){
    	if(mjeket.getReparti().getId() == repartiId) {
    	
    		mjeketrepository.delete(mjeket);
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
    
 
    public Mjeket getMjeket(Long repartiId,Long mjeketID) {
    	
    	Mjeket mjeket = findMyId(mjeketID);
    	
    	  if(mjeket == null ||mjeket.getReparti().getId() != repartiId ) {
    		  throw new MjeketNotFoundExeption("Employe not found ");
    	  }
    
    	return mjeket;
    }


public Mjeket getMjke(Long qytetiId, Long spitaliId, Long repartiId,Long mjekuId) {
	repartiservice.getTask(qytetiId, spitaliId,mjekuId);
    Mjeket task = mjeketrepository.findById(mjekuId)
            .orElseThrow(() -> new RepartiNotFoundException("Task not found"));
    if (task.getReparti().getId() == repartiId) {
        return task;
    }
    throw new RepartiNotFoundException("Task not found");
}


}

