package edu.gatech.cs6310.repository;

import edu.gatech.cs6310.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<Customer, String> {


}
