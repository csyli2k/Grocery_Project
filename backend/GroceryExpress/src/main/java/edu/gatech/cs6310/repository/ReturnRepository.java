package edu.gatech.cs6310.repository;

import edu.gatech.cs6310.entity.Drone;
import edu.gatech.cs6310.entity.ReturnOrder;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface ReturnRepository extends JpaRepository<ReturnOrder, Long> {
    List<ReturnOrder> findAllByCustomerID(String customerId);
    Boolean existsByCustomerID(String customerID);


    ReturnOrder getByCustomerIDAndOrderID(String customerID, String orderID);

    Void deleteAllByTimestampBefore(LocalDate date);
}
