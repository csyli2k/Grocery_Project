package edu.gatech.cs6310.repository;

import edu.gatech.cs6310.entity.Item;
import edu.gatech.cs6310.entity.Store;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StoreRepository extends JpaRepository<Store,String> {


}
