package org.internship.rentpro.rentpro.repository;

import org.internship.rentpro.rentpro.model.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Locale;
import java.util.Optional;

@Repository
public interface AdminRepo extends JpaRepository<Admin,Long> {

    Optional<Admin> findByEmail(String email);
}
