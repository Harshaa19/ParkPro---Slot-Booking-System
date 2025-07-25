package org.internship.rentpro.rentpro.controller;

import org.internship.rentpro.rentpro.model.ParkingLot;
import org.internship.rentpro.rentpro.service.ParkingLotService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/parking-lots")
@CrossOrigin(origins = "*") // or specify your frontend domain
public class ParkingLotController {

    @Autowired
    private ParkingLotService parkingLotService;

    // ➕ Add a new parking lot
    @PostMapping("/admin/add")
    public ResponseEntity<ParkingLot> addParkingLot(@RequestBody ParkingLot parkingLot) {
        ParkingLot savedLot = parkingLotService.saveParkingLot(parkingLot);
        return ResponseEntity.ok(savedLot);
    }

    // 📥 Get all parking lots
    @GetMapping("/all")
    public ResponseEntity<List<ParkingLot>> getAllParkingLots() {
        List<ParkingLot> lots = parkingLotService.getAllParkingLots();
        return ResponseEntity.ok(lots);
    }

    // 📄 Get parking lot by ID
    @GetMapping("/{id}")
    public ResponseEntity<ParkingLot> getParkingLotById(@PathVariable Long id) {
        Optional<ParkingLot> lot = parkingLotService.getParkingLotById(id);
        return lot.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // 📝 Update parking lot
    @PutMapping("/admin/{id}")
    public ResponseEntity<ParkingLot> updateParkingLot(@PathVariable Long id, @RequestBody ParkingLot updatedLot) {
        Optional<ParkingLot> existingLot = parkingLotService.getParkingLotById(id);
        if (existingLot.isPresent()) {
            ParkingLot lot = existingLot.get();
            lot.setName(updatedLot.getName());
            lot.setLocation(updatedLot.getLocation());
            lot.setRate(updatedLot.getRate());
            lot.setStatus(updatedLot.getStatus());
            lot.setTotalCapacity(updatedLot.getTotalCapacity());
            lot.setVehicleTypes(updatedLot.getVehicleTypes());
            lot.setOpenTime(updatedLot.getOpenTime());
            lot.setCloseTime(updatedLot.getCloseTime());
            lot.setNotes(updatedLot.getNotes());
            lot.setImageUrl(updatedLot.getImageUrl());

            return ResponseEntity.ok(parkingLotService.saveParkingLot(lot));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // ❌ Delete a parking lot
    @DeleteMapping("/admin/{id}")
    public ResponseEntity<Void> deleteParkingLot(@PathVariable Long id) {
        parkingLotService.deleteParkingLot(id);
        return ResponseEntity.noContent().build();
    }
}
