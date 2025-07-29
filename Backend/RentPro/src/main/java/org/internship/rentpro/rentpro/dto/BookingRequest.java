package org.internship.rentpro.rentpro.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class BookingRequest {
    private LocalDate pickupDate;
    private LocalDate returnDate;
    private Long vehicleId;
}
