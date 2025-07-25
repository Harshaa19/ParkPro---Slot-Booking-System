package org.internship.rentpro.rentpro.service;

import lombok.RequiredArgsConstructor;
import org.internship.rentpro.rentpro.model.Admin;
import org.internship.rentpro.rentpro.model.User;
import org.internship.rentpro.rentpro.repository.AdminRepo;
import org.internship.rentpro.rentpro.repository.UserRepo;
import org.internship.rentpro.rentpro.service.AdminService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService {

    private final AdminRepo adminRepo;


    @Override
    public Admin authenticateAdmin(String email, String password) {
        return adminRepo.findByEmail(email)
                .filter(admin ->
                        (admin.getRole().equals("ROLE_ADMIN")) &&
                                admin.getPassword().equals(password))
                .orElse(null);
    }

}
