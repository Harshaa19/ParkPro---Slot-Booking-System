package org.internship.rentpro.rentpro.controller;

import org.internship.rentpro.rentpro.model.Vehicle;
import org.internship.rentpro.rentpro.service.VehicleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

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
            @RequestParam("imageUrl") String imageUrl  // new: image as URL
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
        vehicle.setImageUrl(imageUrl); // set image URL

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
    public List<Vehicle> getVehicleByType(@PathVariable String vehicleType){
        return vehicleService.getVehicleByType(vehicleType);

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVehicle(@PathVariable Long id) {
        vehicleService.deleteVehicle(id);
        return ResponseEntity.noContent().build();
    }
}
