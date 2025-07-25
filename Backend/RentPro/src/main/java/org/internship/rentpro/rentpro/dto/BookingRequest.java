package org.internship.rentpro.rentpro.dto;

import lombok.Data;
import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class BookingRequest {
    private Long parkingLotId;
    private String vehicleNumber;
    private String vehicleType;
    private LocalDate bookingDate;
    private LocalTime fromTime;
    private LocalTime toTime;
}
