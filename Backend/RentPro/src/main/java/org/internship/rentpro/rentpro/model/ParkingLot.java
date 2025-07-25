package org.internship.rentpro.rentpro.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.EqualsAndHashCode;

import java.util.List;

@Entity
@Getter
@Setter
@EqualsAndHashCode
@Table(name = "parking_lot")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class ParkingLot {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String location;

    private int totalCapacity;

    @ElementCollection
    @CollectionTable(name = "parking_lot_vehicle_types", joinColumns = @JoinColumn(name = "parking_lot_id"))
    @Column(name = "vehicle_type")
    private List<String> vehicleTypes;

    private double rate; // per hour

    private String openTime;

    private String closeTime;

    private String status; // Active / Inactive

    @Lob
    private String notes;

    @Lob
    private String imageUrl;
}
