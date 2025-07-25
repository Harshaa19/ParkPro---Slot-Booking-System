package org.internship.rentpro.rentpro.controller;

import lombok.RequiredArgsConstructor;
import org.internship.rentpro.rentpro.dto.AdminLoginRequest;
import org.internship.rentpro.rentpro.model.Admin;
import org.internship.rentpro.rentpro.requests.JWTImpl;
import org.internship.rentpro.rentpro.service.AdminService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;
    private final JWTImpl jwtService;

    @PostMapping("/login")
    public ResponseEntity<?> loginAdmin(@RequestBody AdminLoginRequest request) {
        Admin admin = adminService.authenticateAdmin(request.getEmail(), request.getPassword());

        if (admin == null || !admin.getRole().equals("ROLE_ADMIN")) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("message", "Invalid credentials or not authorized as admin"));
        }

        String token = jwtService.generateToken(
                admin.getEmail(),
                admin.getId(),
                admin.getRole()
        );

        return ResponseEntity.ok(Map.of(
                "token", token,
                "id", admin.getId(),
                "email", admin.getEmail(),
                "role", admin.getRole()
        ));
    }
}
