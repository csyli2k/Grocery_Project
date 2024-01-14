package edu.gatech.cs6310.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import edu.gatech.cs6310.auth.models.User;

import java.util.Optional;



public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUsername(String username);

    Boolean existsByUsername(String username);

    Boolean existsByEmail(String email);
}
