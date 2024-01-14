package edu.gatech.cs6310.repository;

import edu.gatech.cs6310.entity.Drone;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface DroneRepository extends JpaRepository<Drone, Long> {
    Boolean existsByStoreAndDroneName(String store, String name);
    Optional<Drone> findByStoreAndDroneName(String store, String name);

    Drone getByStoreAndDroneName(String store, String name);
    Optional<Drone> findByPilotID(String pilotID);
    List<Drone> findAllByStore(String store);


}