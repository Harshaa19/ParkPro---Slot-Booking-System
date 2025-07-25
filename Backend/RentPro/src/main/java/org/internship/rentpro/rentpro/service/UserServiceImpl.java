package org.internship.rentpro.rentpro.service;

import org.internship.rentpro.rentpro.model.User;
import org.internship.rentpro.rentpro.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepo userRepository;

    @Override
    public User saveUser(User user) {
        // Set role based on email logic
        if (user.getEmail().equalsIgnoreCase("admin@gmail.com")) {
            user.setRole("ROLE_ADMIN");
        } else {
            user.setRole("ROLE_USER");
        }

        return userRepository.save(user);
    }


    @Override
    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("User Not Found with id " + id));
    }

    @Override
    public User getUserByEmail(String userEmail) {
        return userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new NoSuchElementException("User Not Found with email " + userEmail));
    }
}
