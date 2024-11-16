package org.makerminds.javaweb.service;

import org.makerminds.javaweb.response.UserResponse;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class UserService {

    private final RestTemplate restTemplate = new RestTemplate();

    public UserResponse getUserById(Long userId) {
        return restTemplate.getForObject("http://192.168.1.19:8083/in.mahesh.tasks/user/" + userId, UserResponse.class);
    }
}