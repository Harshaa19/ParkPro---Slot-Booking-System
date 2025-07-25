package org.internship.rentpro.rentpro.service;

import org.internship.rentpro.rentpro.model.ParkingLot;
import org.internship.rentpro.rentpro.repository.ParkingLotRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ParkingLotService {

    @Autowired
    private ParkingLotRepo parkingLotRepository;

    public ParkingLot saveParkingLot(ParkingLot parkingLot) {
        return parkingLotRepository.save(parkingLot);
    }

    public List<ParkingLot> getAllParkingLots() {
        return parkingLotRepository.findAll();
    }

    public Optional<ParkingLot> getParkingLotById(Long id) {
        return parkingLotRepository.findById(id);
    }

    public void deleteParkingLot(Long id) {
        parkingLotRepository.deleteById(id);
    }

    // Example of filtering (optional)
    public List<ParkingLot> getParkingLotsByStatus(String status) {
        return parkingLotRepository.findAll().stream()
                .filter(lot -> lot.getStatus().equalsIgnoreCase(status))
                .toList();
    }
}
