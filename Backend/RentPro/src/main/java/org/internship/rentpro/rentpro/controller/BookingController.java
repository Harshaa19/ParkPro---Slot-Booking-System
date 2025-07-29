package org.internship.rentpro.rentpro.controller;

import lombok.RequiredArgsConstructor;
import org.internship.rentpro.rentpro.dto.BookingRequest;
import org.internship.rentpro.rentpro.dto.BookingWithVehicleDTO;
import org.internship.rentpro.rentpro.model.Booking;
import org.internship.rentpro.rentpro.repository.BookingRepository;
import org.internship.rentpro.rentpro.service.BookingService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@RequiredArgsConstructor
public class BookingController {

    private final BookingService bookingService;
    private final BookingRepository bookingRepository;

    @PostMapping
    public ResponseEntity<Booking> bookVehicle(@RequestBody BookingRequest request) {
        Booking booking = bookingService.createBooking(request);
        return ResponseEntity.ok(booking);
    }

    @GetMapping("/my-bookings")
    public ResponseEntity<List<BookingWithVehicleDTO>> getMyBookings(@RequestHeader("Authorization") String authHeader) {
        String token = authHeader.replace("Bearer ", "");
        List<BookingWithVehicleDTO> bookings = bookingService.getBookingsForCurrentUser(token);
        return ResponseEntity.ok(bookings);
    }

    @DeleteMapping("/{bookingId}")
    public ResponseEntity<?> cancelBooking(@PathVariable Long bookingId) {
        try {
            boolean cancelled = bookingService.cancelBookingById(bookingId);
            if (cancelled) {
                return ResponseEntity.ok().body("✅ Booking with ID " + bookingId + " cancelled successfully.");
            } else {
                return ResponseEntity.status(400).body("❌ Booking could not be cancelled. Either it does not exist or is already cancelled.");
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).body("❗ An error occurred while cancelling the booking: " + e.getMessage());
        }
    }

}
