package edu.gatech.cs6310.controller;

import edu.gatech.cs6310.Response.ResponseType;
import edu.gatech.cs6310.entity.Drone;
import edu.gatech.cs6310.repository.DroneRepository;
import edu.gatech.cs6310.repository.PilotRepository;
import edu.gatech.cs6310.repository.StoreRepository;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RequestMapping("/pilot")
@AllArgsConstructor
@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
public class PilotController {

    StoreRepository storeRepository;
    DroneRepository droneRepository;
    PilotRepository pilotRepository;

    @PutMapping("/fly/{store}/{droneName}/{pilotID}")
    public String flyDrone(@PathVariable String store, @PathVariable String droneName, @PathVariable String pilotID) {
        if (!storeRepository.existsById(store)) {
            return ResponseType.STORE_DOES_NOT_EXIST.getMessage();
        }
        Optional<Drone> droneA = droneRepository.findByStoreAndDroneName(store, droneName);
        if (droneA.isEmpty()) {
            return ResponseType.DRONE_DOES_NOT_EXIST.getMessage();
        }
        if(!pilotRepository.existsById(pilotID)) {
            return "ERROR:pilot_identifier_does_not_exist";
        }
        droneRepository.findByPilotID(pilotID).ifPresent(drone -> {
            drone.setPilotID(null);
            droneRepository.save(drone);
        });
        droneA.get().setPilotID(pilotID);
        droneRepository.save(droneA.get());
        return ResponseType.OK_CHANGE.getMessage();
    }


}



