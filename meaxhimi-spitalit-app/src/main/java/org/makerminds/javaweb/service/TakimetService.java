package org.makerminds.javaweb.service;

import java.util.List;

import org.makeminds.javaweb.Exeption.TakimetNotFoundException;
import org.makerminds.javaweb.Entity.Mjeket;
import org.makerminds.javaweb.Entity.Takimet;
import org.makerminds.javaweb.dto.UserWithMeetings;
import org.makerminds.javaweb.interfacee.UserClient;
import org.makerminds.javaweb.repository.TakimetRepository;
import org.makerminds.javaweb.response.UserResponse;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;






@Service
public class TakimetService {

    private final TakimetRepository takimetRepository;
    private final MjeketService mjeketService;
    private final UserClient userClient;


    public TakimetService(TakimetRepository takimetRepository, MjeketService mjeketService, UserClient userClient) {
        this.takimetRepository = takimetRepository;
        this.mjeketService = mjeketService;
        this.userClient = userClient;
    }

    public Takimet createNewTakimet(Takimet newTask, Long employeeId, Long departmentId, Long userId) {
        Mjeket reparti = mjeketService.getMjeket(departmentId, employeeId);
        newTask.setEmployee(reparti);
        newTask.setUserId(userId);

        switch (newTask.getStatus()) {
            case "INPUT QUEUE":
            case "IN PROGRESS":
                break;
            default:
                newTask.setStatus("DONE");
                break;
        }
        return takimetRepository.save(newTask);
    }

    public List<Takimet> getTaskList(Long departamentiID, Long employeeID) {
        return mjeketService.getMjeket(departamentiID, employeeID).getTakimetlist();
    }
    
    public UserResponse getUserById(Long id) {
        ResponseEntity<UserResponse> userResponse = userClient.getUserById(id);
        return userResponse.getBody();
    }
    
    public ResponseEntity<?> deleteTask(Long departmentId, Long employeeId, Long taskId) {
        mjeketService.getMjeket(departmentId, employeeId);
        Takimet task = takimetRepository.findById(taskId)
                .orElseThrow(() -> new TakimetNotFoundException("Task not found"));
        if (task.getEmployee().getId() == employeeId) {
            takimetRepository.delete(task);
            return ResponseEntity.ok().body("Task with id " + taskId + " has been deleted");
        }
        throw new TakimetNotFoundException("Task not found");
    }

    public Takimet getTask(Long departmentId, Long employeeId, Long taskId) {
        mjeketService.getMjeket(departmentId, employeeId);
        Takimet task = takimetRepository.findById(taskId)
                .orElseThrow(() -> new TakimetNotFoundException("Task not found"));
        if (task.getEmployee().getId() == employeeId) {
            return task;
        }
        throw new TakimetNotFoundException("Task not found");
    }

    public UserWithMeetings getUserWithMeetings(Long userId) {
        UserResponse user = getUserById(userId);
        List<Takimet> meetings = takimetRepository.findByUserId(userId);
        UserWithMeetings userWithMeetings = new UserWithMeetings();
        userWithMeetings.setUser(user);
        userWithMeetings.setMeetings(meetings);
        return userWithMeetings;
    }
}