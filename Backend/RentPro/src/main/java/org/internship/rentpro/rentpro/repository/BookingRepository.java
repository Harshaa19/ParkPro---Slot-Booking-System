package org.internship.rentpro.rentpro.repository;

import org.internship.rentpro.rentpro.model.Booking;
import org.internship.rentpro.rentpro.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {

    @Query("SELECT b FROM Booking b " +
            "WHERE b.vehicle.id = :vehicleId " +
            "AND b.status = 'CONFIRMED' " +
            "AND (b.pickupDate <= :returnDate AND b.returnDate >= :pickupDate)")
    List<Booking> findOverlappingBookings(@Param("vehicleId") Long vehicleId,
                                          @Param("pickupDate") LocalDate pickupDate,
                                          @Param("returnDate") LocalDate returnDate);

    List<Booking> findByUserId(Long userId);

    List<Booking> findByUser(User user);
}
