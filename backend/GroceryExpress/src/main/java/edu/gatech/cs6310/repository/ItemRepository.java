package edu.gatech.cs6310.repository;

import edu.gatech.cs6310.entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ItemRepository extends JpaRepository<Item,Long> {
    Boolean existsByStoreNameAndName(String storeName, String name);
    Optional<Item> findByStoreNameAndName(String storeName, String name);


    List<Item> findAllByStoreName(String store);

    Item getByStoreNameAndName(String store, String name);
}
