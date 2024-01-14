package edu.gatech.cs6310.repository;

import edu.gatech.cs6310.entity.OrderLine;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderLineRepository extends JpaRepository<OrderLine, Long> {

    Boolean existsByStoreNameAndOrderNameAndItemName(String store, String order, String item);

    OrderLine findOrderLineByStoreNameAndOrderNameAndItemName(String store, String order, String item);

    void deleteAllByStoreNameAndOrderName(String store, String order);

    List<OrderLine> findAllByStoreNameAndOrderName(String store, String order);
}
