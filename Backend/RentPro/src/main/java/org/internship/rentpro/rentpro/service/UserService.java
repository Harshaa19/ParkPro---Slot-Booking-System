package org.internship.rentpro.rentpro.service;

import org.internship.rentpro.rentpro.model.User;

public interface UserService {
    public User saveUser(User user);
    public User getUserById(Long id);

    User getUserByEmail(String email);
}