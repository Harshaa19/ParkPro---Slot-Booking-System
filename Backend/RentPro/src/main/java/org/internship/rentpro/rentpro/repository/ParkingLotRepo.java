package org.internship.rentpro.rentpro.repository;

import org.internship.rentpro.rentpro.model.ParkingLot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ParkingLotRepo extends JpaRepository<ParkingLot, Long> {
}
