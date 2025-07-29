package org.internship.rentpro.rentpro.model;

import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@EqualsAndHashCode
@Table(name = "vehicle")
public class Vehicle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String vehicleNumber;
    private String vehicleType;      // Car, Bike, Van, etc.
    private String brand;            // BMW, Honda, etc.
    private String model;            // X5, Hornet, etc.
    private String year;             // 2022, 2023, etc.
    private Double price;            // Daily price
    private String category;         // Sedan, Cruiser, etc.
    private String transmission;     // Automatic, Manual
    private String fuelType;         // Petrol, Diesel, Electric
    private String seatingCapacity;  // 2, 4, 5, 7, etc.
    private String location;         // City or area
    private String description;      // Vehicle details

    @Lob
    private String imageUrl; // stores image URL instead of file

    private String vehicleStatus; // "Available" or "Booked"
}
