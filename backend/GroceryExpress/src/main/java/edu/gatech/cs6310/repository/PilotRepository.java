package edu.gatech.cs6310.repository;

import edu.gatech.cs6310.entity.Pilot;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PilotRepository extends JpaRepository<Pilot,String> {
    Optional<Pilot>findPilotByLicense(String license);

}
