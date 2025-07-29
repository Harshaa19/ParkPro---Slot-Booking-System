package org.internship.rentpro.rentpro.controller;

import org.internship.rentpro.rentpro.model.Vehicle;
import org.internship.rentpro.rentpro.service.VehicleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/vehicles")
@CrossOrigin(origins = "http://localhost:5173")
public class VehicleController {

    @Autowired
    private VehicleService vehicleService;

    @PostMapping("/add")
    public ResponseEntity<Vehicle> addVehicle(
            @RequestParam("vehicleNumber") String vehicleNumber,
            @RequestParam("vehicleType") String vehicleType,
            @RequestParam("brand") String brand,
            @RequestParam("model") String model,
            @RequestParam("year") String year,
            @RequestParam("price") String price,
            @RequestParam("category") String category,
            @RequestParam("transmission") String transmission,
            @RequestParam("fuelType") String fuelType,
            @RequestParam("seatingCapacity") String seatingCapacity,
            @RequestParam("location") String location,
            @RequestParam("description") String description,
            @RequestParam("imageUrl") String imageUrl
    ) {
        Vehicle vehicle = new Vehicle();
        vehicle.setVehicleNumber(vehicleNumber);
        vehicle.setVehicleType(vehicleType);
        vehicle.setBrand(brand);
        vehicle.setModel(model);
        vehicle.setYear(year);
        vehicle.setPrice(Double.parseDouble(price));
        vehicle.setCategory(category);
        vehicle.setTransmission(transmission);
        vehicle.setFuelType(fuelType);
        vehicle.setSeatingCapacity(seatingCapacity);
        vehicle.setLocation(location);
        vehicle.setDescription(description);
        vehicle.setImageUrl(imageUrl);
        vehicle.setVehicleStatus("Available"); // Default

        Vehicle savedVehicle = vehicleService.saveVehicle(vehicle);
        return ResponseEntity.ok(savedVehicle);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Vehicle> updateVehicle(@PathVariable Long id, @RequestBody Vehicle vehicle) {
        return vehicleService.getVehicleById(id)
                .map(existing -> {
                    vehicle.setId(id);
                    Vehicle updated = vehicleService.saveVehicle(vehicle);
                    return ResponseEntity.ok(updated);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<String> updateVehicleStatus(@PathVariable Long id, @RequestBody Map<String, String> payload) {
        String requestedStatus = payload.get("status");

        if (requestedStatus == null || requestedStatus.isEmpty()) {
            return ResponseEntity.badRequest().body("Status must be provided.");
        }

        return vehicleService.getVehicleById(id)
                .map(vehicle -> {
                    String currentStatus = vehicle.getVehicleStatus();

                    boolean isValidTransition = (currentStatus.equals("Available") && requestedStatus.equals("Booked"))
                            || (currentStatus.equals("Booked") && requestedStatus.equals("Available"));

                    if (!isValidTransition) {
                        return ResponseEntity.badRequest().body(
                                "Invalid status transition from " + currentStatus + " to " + requestedStatus);
                    }

                    vehicle.setVehicleStatus(requestedStatus);
                    vehicleService.saveVehicle(vehicle);
                    return ResponseEntity.ok("Vehicle status updated to: " + requestedStatus);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/all")
    public List<Vehicle> getAllVehicles() {
        return vehicleService.getAllVehicles();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Vehicle> getVehicleById(@PathVariable Long id) {
        return vehicleService.getVehicleById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/type/{vehicleType}")
    public List<Vehicle> getVehicleByType(@PathVariable String vehicleType) {
        return vehicleService.getVehicleByType(vehicleType);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVehicle(@PathVariable Long id) {
        vehicleService.deleteVehicle(id);
        return ResponseEntity.noContent().build();
    }
}
