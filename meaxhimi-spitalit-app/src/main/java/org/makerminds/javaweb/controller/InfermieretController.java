package org.makerminds.javaweb.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.makeminds.javaweb.Exeption.MjeketNotFoundExeption;
import org.makerminds.javaweb.Entity.Infermieret;
import org.makerminds.javaweb.Entity.Mjeket;
import org.makerminds.javaweb.Entity.Pacienti;
import org.makerminds.javaweb.service.InfermieretService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/infermieret")
@AllArgsConstructor
@CrossOrigin
public class InfermieretController {
    private final InfermieretService infermieretService;

    @PostMapping(path="/{qytetiId}/{SpitaliID}/{repartiID}")

    public ResponseEntity<?> createMjeket(@PathVariable Long qytetiId,@PathVariable Long SpitaliID,
    		@PathVariable Long repartiID,@Valid @RequestBody Infermieret infermieret, BindingResult bindingResult) {
    	if(bindingResult.hasErrors()) {
    		Map<String,String>errors = new HashMap<>();
    		for (FieldError filedError : bindingResult.getFieldErrors()) {
    			errors.put(filedError.getField() , filedError.getDefaultMessage());
    			
    		}
    		return new ResponseEntity<Map<String,String>>(errors ,HttpStatus.BAD_REQUEST);
    	}
    	return ResponseEntity.ok(infermieretService.teOrUpdateMjeket(infermieret,qytetiId,SpitaliID,repartiID));
       
    }

    @GetMapping("/{id}")
    public ResponseEntity<Infermieret> getMjeketById(@PathVariable Long id) {
        Infermieret infermieret = infermieretService.findMyId(id);
        if (infermieret == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(infermieret);
    }

    @GetMapping(path = "/all/{qytetiId}/{spitaliId}/{repartiId}")
    public List<Infermieret>getEmployeeList(@PathVariable Long qytetiId,@PathVariable Long spitaliId,@PathVariable Long repartiId){
    	return infermieretService.getMjeketList(qytetiId,spitaliId,repartiId);
    }

    @DeleteMapping("/reparti/{repartiId}/mjeket/{id}")
    public ResponseEntity<?> deleteMjeketById(@PathVariable Long repartiId, @PathVariable Long id) {
        try {
            return infermieretService.deleteMjeketById(repartiId, id);
        } catch (MjeketNotFoundExeption e) {
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }

    @GetMapping(path = "/o/{qytetiId}/{spitaliId}/{repartiId}/{pacinetId}")
    public Infermieret getEmployeeById(
    		@PathVariable Long qytetiId, @PathVariable Long spitaliId,
    		@PathVariable Long repartiId,@PathVariable Long pacinetId) {
        return infermieretService.getMjke(qytetiId, spitaliId,repartiId,pacinetId);
    }
}

