package org.internship.rentpro.rentpro.repository;

import org.internship.rentpro.rentpro.model.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VehicleRepo extends JpaRepository<Vehicle,Long> {
    List<Vehicle> findByVehicleType(String vehicleType);
}
