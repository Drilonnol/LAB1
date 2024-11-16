package org.makerminds.javaweb.controller;

import org.makerminds.javaweb.response.ApiResponse;
import org.makerminds.javaweb.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AdminController {

    private final AdminService adminService;

    @Autowired
    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @GetMapping("/auth/check")
    public ApiResponse checkAdmin(@RequestHeader("Authorization") String token) {
        return adminService.checkAdmin(token);
    }
}