package org.internship.rentpro.rentpro.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.internship.rentpro.rentpro.dto.BookingRequest;
import org.internship.rentpro.rentpro.dto.BookingWithVehicleDTO;
import org.internship.rentpro.rentpro.model.Booking;
import org.internship.rentpro.rentpro.model.User;
import org.internship.rentpro.rentpro.model.Vehicle;
import org.internship.rentpro.rentpro.repository.BookingRepository;
import org.internship.rentpro.rentpro.repository.UserRepo;
import org.internship.rentpro.rentpro.repository.VehicleRepo;
import org.internship.rentpro.rentpro.requests.JWTImpl;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BookingService {

    private final BookingRepository bookingRepository;
    private final VehicleRepo vehicleRepository;
    private final UserRepo userRepository;
    private final JWTImpl jwtImpl;

    public Booking createBooking(BookingRequest request) {
        // Get the currently authenticated user's email
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));

        // Fetch vehicle
        Vehicle vehicle = vehicleRepository.findById(request.getVehicleId())
                .orElseThrow(() -> new RuntimeException("Vehicle not found"));

        // Validate date range
        long days = ChronoUnit.DAYS.between(request.getPickupDate(), request.getReturnDate());
        if (days <= 0) {
            throw new RuntimeException("Return date must be after pickup date");
        }

        // Check for overlapping bookings
        List<Booking> overlapping = bookingRepository.findOverlappingBookings(
                vehicle.getId(),
                request.getPickupDate(),
                request.getReturnDate()
        );

        if (!overlapping.isEmpty()) {
            throw new RuntimeException("This vehicle is already booked for the selected dates.");
        }

        // Create and save the booking
        Booking booking = new Booking();
        booking.setPickupDate(request.getPickupDate());
        booking.setReturnDate(request.getReturnDate());
        booking.setUser(user);
        booking.setVehicle(vehicle);
        booking.setTotalAmount(days * vehicle.getPrice());
        Booking savedBooking = bookingRepository.save(booking);

        // ✅ Mark vehicle as Booked
        vehicle.setVehicleStatus("Booked");
        vehicleRepository.save(vehicle);

        return savedBooking;
    }

    public List<BookingWithVehicleDTO> getBookingsForCurrentUser(String token) {
        String currentUserEmail = jwtImpl.extractEmail(token);
        User user = userRepository.findByEmail(currentUserEmail)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        List<Booking> bookings = bookingRepository.findByUser(user);

        return bookings.stream()
                .map(booking -> new BookingWithVehicleDTO(booking, booking.getVehicle()))
                .collect(Collectors.toList());
    }


    @Transactional
    public boolean cancelBookingById(Long bookingId) {
        Optional<Booking> optionalBooking = bookingRepository.findById(bookingId);
        if (optionalBooking.isEmpty()) return false;

        Booking booking = optionalBooking.get();
        booking.setStatus("CANCELLED");

        Vehicle vehicle = booking.getVehicle();
        if (vehicle != null) {
            vehicle.setVehicleStatus("Available");
            vehicleRepository.save(vehicle); // Only needed if cascade not set
        }

        bookingRepository.save(booking);
        return true;
    }



}
