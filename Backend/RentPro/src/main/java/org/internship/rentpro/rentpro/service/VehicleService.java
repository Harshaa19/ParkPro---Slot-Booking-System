package org.internship.rentpro.rentpro.service;

import org.internship.rentpro.rentpro.model.Vehicle;
import org.internship.rentpro.rentpro.repository.VehicleRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VehicleService {

    @Autowired
    private VehicleRepo vehicleRepository;

    public Vehicle saveVehicle(Vehicle vehicle) {
        // Set default status if not set
        if (vehicle.getVehicleStatus() == null || vehicle.getVehicleStatus().isEmpty()) {
            vehicle.setVehicleStatus("Available");
        }
        return vehicleRepository.save(vehicle);
    }

    public List<Vehicle> getAllVehicles() {
        return vehicleRepository.findAll();
    }

    public Optional<Vehicle> getVehicleById(Long id) {
        return vehicleRepository.findById(id);
    }

    public void deleteVehicle(Long id) {
        vehicleRepository.deleteById(id);
    }

    public List<Vehicle> getVehicleByType(String vehicleType) {
        return vehicleRepository.findByVehicleType(vehicleType);
    }

    public void markVehicleAsBooked(Long vehicleId) {
        vehicleRepository.findById(vehicleId).ifPresent(vehicle -> {
            vehicle.setVehicleStatus("Booked");
            vehicleRepository.save(vehicle);
        });
    }

    public void markVehicleAsAvailable(Long vehicleId) {
        vehicleRepository.findById(vehicleId).ifPresent(vehicle -> {
            vehicle.setVehicleStatus("Available");
            vehicleRepository.save(vehicle);
        });
    }
    public List<Vehicle> saveAllVehicles(List<Vehicle> vehicles) {
        for (Vehicle v : vehicles) {
            v.setVehicleStatus("Available"); // ensure default status
        }
        return vehicleRepository.saveAll(vehicles);
    }
}
