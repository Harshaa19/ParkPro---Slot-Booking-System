// BookingWithVehicleDTO.java
package org.internship.rentpro.rentpro.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.internship.rentpro.rentpro.model.Booking;
import org.internship.rentpro.rentpro.model.Vehicle;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookingWithVehicleDTO {
    private Booking booking;
    private Vehicle vehicle;
}
