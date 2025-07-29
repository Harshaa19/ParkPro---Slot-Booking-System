package org.internship.rentpro.rentpro.controller;

import org.internship.rentpro.rentpro.dto.UserDTO;
import org.internship.rentpro.rentpro.model.User;
import org.internship.rentpro.rentpro.requests.JWTImpl;
import org.internship.rentpro.rentpro.requests.UserLogin;
import org.internship.rentpro.rentpro.service.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    private static final String ROLE_USER = "ROLE_USER";
    private static final String ROLE_ADMIN = "ROLE_ADMIN";

    @Autowired
    private UserServiceImpl userService;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private JWTImpl jwtUtil;

    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@RequestBody User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole(ROLE_USER); // Assign default role on registration
        User savedUser = userService.saveUser(user);
        return ResponseEntity.ok(savedUser);
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody UserLogin userLogin) {
        try {
            User existingUser = userService.getUserByEmail(userLogin.getEmail());

            if (passwordEncoder.matches(userLogin.getPassword(), existingUser.getPassword())) {
                // Assign role based on email domain
                String assignedRole = existingUser.getEmail().endsWith("@admin.com") ? ROLE_ADMIN : ROLE_USER;

                if (!assignedRole.equals(existingUser.getRole())) {
                    existingUser.setRole(assignedRole);
                    userService.saveUser(existingUser);
                }

                String token = jwtUtil.generateToken(existingUser.getEmail(), existingUser.getId(), existingUser.getRole());

                Map<String, Object> response = new HashMap<>();
                response.put("token", token);
                response.put("id", existingUser.getId());
                response.put("email", existingUser.getEmail());
                response.put("username", existingUser.getFirstName() + " " + existingUser.getLastName());
                response.put("role", existingUser.getRole());

                return ResponseEntity.ok(response);
            }

        } catch (Exception e) {
            // Optional logging here
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password.");
    }

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(@RequestHeader("Authorization") String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Missing or invalid Authorization header");
        }

        String token = authHeader.substring(7);
        boolean valid = jwtUtil.isValidToken(token);

        if (!valid) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid or expired token");
        }

        Long tokenUserId = jwtUtil.extractUserId(token);
        User user = userService.getUserById(tokenUserId);

        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }

        UserDTO dto = new UserDTO(
                user.getId(),
                user.getFirstName(),
                user.getLastName(),
                user.getEmail(),
                user.getPhoneNumber(),
                user.getRole()
        );

        return ResponseEntity.ok(dto);
    }

}
