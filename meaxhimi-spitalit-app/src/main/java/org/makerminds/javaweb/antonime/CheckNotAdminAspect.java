package org.makerminds.javaweb.antonime;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.reflect.MethodSignature;
import org.makerminds.javaweb.response.ApiResponse;
import org.makerminds.javaweb.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RequestHeader;

import java.lang.reflect.Method;

@Aspect
@Component
public class CheckNotAdminAspect {

    @Autowired
    private AdminService adminService;

    @Around("@annotation(CheckNotAdmin)")
    public Object checkNotAdmin(ProceedingJoinPoint joinPoint) throws Throwable {
        MethodSignature signature = (MethodSignature) joinPoint.getSignature();
        Method method = signature.getMethod();

        Object[] args = joinPoint.getArgs();
        
        for (Object arg : args) {
            if (arg instanceof String) {
                String token = (String) arg;
                // Log për të verifikuar token-in
                System.out.println("Token received in aspect: " + token);
                
                ApiResponse isAdminResponse = adminService.checkAdmin(token);

                if (isAdminResponse.isStatus()) {
                    // Log për autorizimin
                    System.out.println("Unauthorized access attempt by admin.");
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Administrators are not authorized to perform this action.");
                } else {
                    // Log për autorizimin
                    System.out.println("Authorized access.");
                    return joinPoint.proceed();
                }
            }
        }

        // Log për token-in mungues
        System.out.println("Token not provided.");
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Token not provided.");
    }
}