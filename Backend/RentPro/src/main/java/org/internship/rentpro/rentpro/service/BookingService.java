package org.internship.rentpro.rentpro.service;

import org.internship.rentpro.rentpro.dto.BookingRequest;
import org.internship.rentpro.rentpro.model.Booking;

import java.util.List;
import java.util.Optional;

public interface BookingService {
    Booking createBookingForUser(BookingRequest request, String userEmail);

    List<Booking> getBookingsForUserId(Long userId);

    Optional<Booking> getBookingById(Long id);
    public List<Booking> getAllBookings();
    void cancelBooking(Long bookingId, String userEmail);
}
