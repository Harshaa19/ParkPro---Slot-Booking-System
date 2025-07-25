package org.internship.rentpro.rentpro.controller;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.internship.rentpro.rentpro.dto.BookingRequest;
import org.internship.rentpro.rentpro.model.Booking;
import org.internship.rentpro.rentpro.requests.JWTImpl;
import org.internship.rentpro.rentpro.service.BookingService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@RequiredArgsConstructor
public class BookingController {

    private final BookingService bookingService;
    private final JWTImpl jwtService;

    @PostMapping("/parking")
    public ResponseEntity<?> createBooking(@RequestBody BookingRequest request, Authentication auth) {
        try {
            String userEmail = auth.getName();
            Booking savedBooking = bookingService.createBookingForUser(request, userEmail);
            return ResponseEntity.ok(savedBooking);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error creating booking: " + e.getMessage());
        }
    }

//@GetMapping("/my")
//public ResponseEntity<?> getUserBookings(Authentication auth) {
//    System.out.println("Authorities: " + auth.getAuthorities());
//    String email = auth.getName(); // email comes from the token's subject
//    List<Booking> bookings = bookingService.getBookingsForUserEmail(email);
//    return ResponseEntity.ok(bookings);
//}
@GetMapping("/user/{userId}")
public ResponseEntity<?> getBookingsForUser(@PathVariable Long userId, HttpServletRequest request) {
    try {
        String token = request.getHeader("Authorization");
        if (token != null && token.startsWith("Bearer ")) {
            token = token.substring(7);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Missing or invalid Authorization header");
        }

        Long tokenUserId = jwtService.extractUserId(token); // Extract user ID from token

        if (tokenUserId == null || !tokenUserId.equals(userId)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("User ID mismatch: Access denied");
        }
        System.out.println("Requested userId: " + userId + ", Token userId: " + tokenUserId);

        List<Booking> bookings = bookingService.getBookingsForUserId(userId);
        return ResponseEntity.ok(bookings);

    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Failed to get bookings: " + e.getMessage());
    }
}

    @DeleteMapping("/{bookingId}")
    public ResponseEntity<?> cancelBooking(@PathVariable Long bookingId, Authentication auth) {
        try {
            String userEmail = auth.getName();
            bookingService.cancelBooking(bookingId, userEmail);
            return ResponseEntity.ok("Booking cancelled successfully.");
        } catch (SecurityException e) {
            System.out.println("Cancel request for booking ID: " + bookingId );
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error cancelling booking: " + e.getMessage());
        }
    }

    @GetMapping("/{bookingId}")
    public ResponseEntity<?> getBookingById(@PathVariable Long bookingId) {
        return bookingService.getBookingById(bookingId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    @GetMapping("/all")
    public ResponseEntity<?> getAllBookings(HttpServletRequest request) {
        try {
            String token = request.getHeader("Authorization");
            if (token != null && token.startsWith("Bearer ")) {
                token = token.substring(7);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Missing or invalid Authorization header");
            }

            String role = jwtService.extractUserRole(token);
            if (!role.equals("ROLE_SUPER_ADMIN") && !role.equals("ROLE_COMPANY_ADMIN")) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Access denied: Insufficient permissions");
            }

            List<Booking> bookings = bookingService.getAllBookings();
            return ResponseEntity.ok(bookings);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to retrieve bookings: " + e.getMessage());
        }
    }


}
