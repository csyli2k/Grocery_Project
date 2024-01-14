package edu.gatech.cs6310.repository;

import edu.gatech.cs6310.entity.UserOrder;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;


public interface OrderRepository extends JpaRepository<UserOrder, Long> {

    List<UserOrder> findAllByStoreName(String store);

    List<UserOrder> findAllByCustomerID(String customer);

    Optional<UserOrder> findByStoreNameAndOrderName(String store, String order);

    UserOrder getByStoreNameAndOrderName(String store, String order);
    void deleteByTimestampBefore(LocalDate date);

    Boolean existsByStoreNameAndOrderName(String store, String name);

    List<UserOrder> findAllByTimestampBefore(LocalDate date);

    Optional<UserOrder> findAllByCustomerIDAndOrderId(String customerID, Long orderID);

    UserOrder getByCustomerAccountAndOrderId(String customerAccount, Long orderId);

    Boolean existsByCustomerAccountAndOrderId(String customerAccount, Long orderId);
}
