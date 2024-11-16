package org.makerminds.javaweb.service;

import java.util.ArrayList;
import java.util.List;


import org.makeminds.javaweb.Exeption.RepartiNotFoundException;

import org.makerminds.javaweb.Entity.Reparti;
import org.makerminds.javaweb.Entity.Spitali;
import org.makerminds.javaweb.repository.RepartiRepository;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RepartiService {
	

	    private final RepartiRepository takimetRepository;
	    private final SpitaliService spitaliservice;

	    public Reparti createNewReparti(Reparti newTask, Long departmentid, Long empoyeeid) {

			Spitali employee= spitaliservice.getSpitali(departmentid, empoyeeid);

			newTask.setSpitali(employee);

			return takimetRepository.save(newTask);

		}

	 

	    public List<Reparti> getTaskList(Long departamentiID, Long employeeID) {
	        return spitaliservice.getSpitali(departamentiID, employeeID).getRepartet();
	    }

	    public ResponseEntity<?> deleteTask(Long departmentId, Long employeeId, Long taskId) {
	    	spitaliservice.getSpitali(departmentId, employeeId);
	        Reparti task = takimetRepository.findById(taskId)
	                .orElseThrow(() -> new RepartiNotFoundException("Task not found"));
	        if (task.getSpitali().getId() == employeeId) {
	            takimetRepository.delete(task);
	            return ResponseEntity.ok().body("Task with id " + taskId + " has been deleted");
	        }
	        throw new RepartiNotFoundException("Task not found");
	    }

	    public Reparti getTask(Long departmentId, Long employeeId, Long taskId) {
	    	spitaliservice.getSpitali(departmentId, employeeId);
	        Reparti task = takimetRepository.findById(taskId)
	                .orElseThrow(() -> new RepartiNotFoundException("Task not found"));
	        if (task.getSpitali().getId() == employeeId) {
	            return task;
	        }
	        throw new RepartiNotFoundException("Task not found");
	    }
	    public Reparti findById(Long id) {return takimetRepository.findById(id).orElse(null);}
	    
	    public Reparti getTask1(Long departmentId) {
	    	spitaliservice.getSpitali1(departmentId);
	        Reparti task = takimetRepository.findById(departmentId)
	                .orElseThrow(() -> new RepartiNotFoundException("Task not found"));
	        if (task.getSpitali().getId() == departmentId) {
	            return task;
	        }
	        throw new RepartiNotFoundException("Task not found");
	    }
	}

