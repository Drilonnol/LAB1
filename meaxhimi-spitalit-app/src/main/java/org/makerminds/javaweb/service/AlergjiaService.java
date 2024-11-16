package org.makerminds.javaweb.service;

import java.util.List;

import org.makeminds.javaweb.Exeption.TakimetNotFoundException;
import org.makerminds.javaweb.Entity.Alergjia;
import org.makerminds.javaweb.Entity.Mjeket;
import org.makerminds.javaweb.Entity.Pacienti;
import org.makerminds.javaweb.Entity.Reparti;
import org.makerminds.javaweb.Entity.Spitali;
import org.makerminds.javaweb.Entity.Takimet;
import org.makerminds.javaweb.repository.AlergjiaRepository;
import org.makerminds.javaweb.repository.PacientiRepository;
import org.makerminds.javaweb.repository.TakimetRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AlergjiaService {
	
	  private final AlergjiaRepository alergjiaRepository;
	    private final PacinetiService pacinetiService;
	
	
	    public Alergjia createNewTakimet(Alergjia newTask, Long departmentId, Long employeeId) {
	        Pacienti reparti = pacinetiService.getPacinet(departmentId, employeeId);
	        newTask.setPacineti(reparti);
	       
	        return alergjiaRepository.save(newTask);
	    }
	 public List<Alergjia> getTaskList(Long departamentiID, Long employeeID) {
	        return pacinetiService.getPacinet(departamentiID, employeeID).getAlergjiList();
	    }

	    public ResponseEntity<?> deleteTask(Long departmentId, Long employeeId, Long taskId) {
	        pacinetiService.getPacinet(departmentId, employeeId);
	        Alergjia task = alergjiaRepository.findById(taskId)
	                .orElseThrow(() -> new TakimetNotFoundException("Task not found"));
	        if (task.getPacineti().getId() == employeeId) {
	            alergjiaRepository.delete(task);
	            return ResponseEntity.ok().body("Task with id " + taskId + " has been deleted");
	        }
	        throw new TakimetNotFoundException("Task not found");
	    }

	    public Alergjia getTask(Long departmentId, Long employeeId, Long taskId) {
	        pacinetiService.getPacinet(departmentId, employeeId);
	        Alergjia task = alergjiaRepository.findById(taskId)
	                .orElseThrow(() -> new TakimetNotFoundException("Task not found"));
	        if (task.getPacineti().getId() == employeeId) {
	            return task;
	        }
	        throw new TakimetNotFoundException("Task not found");
	    }

}
