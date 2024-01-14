package edu.gatech.cs6310.repository;


import edu.gatech.cs6310.entity.ReturnParameter;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ReturnParameterRepository extends JpaRepository<ReturnParameter,Integer> {

}
