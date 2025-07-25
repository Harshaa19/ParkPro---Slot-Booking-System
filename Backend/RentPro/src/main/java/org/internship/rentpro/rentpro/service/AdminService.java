package org.internship.rentpro.rentpro.service;

import org.internship.rentpro.rentpro.model.Admin;
public interface AdminService {
    Admin authenticateAdmin(String email, String password);
}
