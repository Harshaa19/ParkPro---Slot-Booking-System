package org.internship.rentpro.rentpro.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.internship.rentpro.rentpro.dto.BookingRequest;
import org.internship.rentpro.rentpro.model.Booking;
import org.internship.rentpro.rentpro.model.ParkingLot;
import org.internship.rentpro.rentpro.model.User;
import org.internship.rentpro.rentpro.repository.BookingRepo;
import org.internship.rentpro.rentpro.repository.ParkingLotRepo;
import org.internship.rentpro.rentpro.repository.UserRepo;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BookingServiceImpl implements BookingService {

    private final BookingRepo bookingRepository;
    private final UserRepo userRepository;
    private final ParkingLotRepo parkingLotRepo;
    @Override
    @Transactional
    public Booking createBookingForUser(BookingRequest request, String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found: " + userEmail));

        ParkingLot lot = parkingLotRepo.findById(request.getParkingLotId())
                .orElseThrow(() -> new RuntimeException("Parking lot not found with id: " + request.getParkingLotId()));

        Booking booking = new Booking();
        booking.setUser(user);
        booking.setParkingLot(lot);
        booking.setBookingDate(request.getBookingDate());
        booking.setFromTime(request.getFromTime());
        booking.setToTime(request.getToTime());
        booking.setVehicleNumber(request.getVehicleNumber());
        booking.setVehicleType(request.getVehicleType());

        // 🧮 Calculate Price in Service Layer
        if (request.getFromTime() != null && request.getToTime() != null) {
            long durationInMinutes = java.time.Duration.between(request.getFromTime(), request.getToTime()).toMinutes();
            double hours = durationInMinutes / 60.0;
            double price = Math.ceil(hours * lot.getRate());
            booking.setPrice(price);
        }

        return bookingRepository.save(booking);
    }


    @Override
    public List<Booking> getBookingsForUserId(Long userId) {
        return bookingRepository.findByUserId(userId);
    }

    @Override
    public Optional<Booking> getBookingById(Long id) {
        return bookingRepository.findById(id);
    }

    @Override
    public void cancelBooking(Long bookingId, String userEmail) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        if (!booking.getUser().getEmail().equals(userEmail)) {
            throw new SecurityException("Unauthorized to cancel this booking");
        }

        booking.setStatus("CANCELLED");
        bookingRepository.save(booking);
    }
    @Override
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();

    }
}
