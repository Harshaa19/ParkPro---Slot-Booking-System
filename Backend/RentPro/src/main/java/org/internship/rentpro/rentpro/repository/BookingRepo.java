package org.internship.rentpro.rentpro.repository;

import org.internship.rentpro.rentpro.model.Booking;
import org.internship.rentpro.rentpro.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookingRepo extends JpaRepository<Booking, Long> {
    List<Booking> findAllByUserEmail(String email); // optional, for customization

    List<Booking> findByUserId(Long userId);

    List<Booking> findByUser(User user);
}
