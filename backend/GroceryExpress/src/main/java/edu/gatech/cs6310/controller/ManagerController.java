package edu.gatech.cs6310.controller;

import edu.gatech.cs6310.Response.ResponseData;
import edu.gatech.cs6310.Response.ResponseType;
import edu.gatech.cs6310.entity.Drone;
import edu.gatech.cs6310.entity.Item;
import edu.gatech.cs6310.entity.Store;
import edu.gatech.cs6310.entity.UserOrder;
import edu.gatech.cs6310.repository.DroneRepository;
import edu.gatech.cs6310.repository.ItemRepository;
import edu.gatech.cs6310.repository.OrderRepository;
import edu.gatech.cs6310.repository.StoreRepository;
import lombok.AllArgsConstructor;
import org.hibernate.service.spi.ServiceException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequestMapping("/manager")
@AllArgsConstructor
@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
public class ManagerController {

    private ItemRepository itemRepository;
    private StoreRepository storeRepository;
    private DroneRepository droneRepository;
    private OrderRepository orderRepository;


    //sell item
    @PostMapping("/item")
    public ResponseEntity<ResponseData<Item>> newItem(@RequestBody Item newItem) throws ServiceException {
        System.out.println("new Item is: " + newItem.getStoreName() + ", " + newItem.getName() + ", " + newItem.getWeight());
        if (!storeRepository.existsById(newItem.getStoreName())) {
            return ResponseEntity.ok(ResponseData.create(ResponseType.STORE_DOES_NOT_EXIST));
        } else if (itemRepository.findByStoreNameAndName(newItem.getStoreName(), newItem.getName()).isPresent()) {
            return ResponseEntity.ok(ResponseData.create(ResponseType.ITEM_EXISTS));
        }
        Item item = itemRepository.save(newItem);
        return ResponseEntity.ok(ResponseData.create(ResponseType.OK_CHANGE));
    }

    //make drone
    @PostMapping("/drone")
    public ResponseEntity<ResponseData<Drone>> newDrone(@RequestBody Drone newDrone) throws ServiceException {
        System.out.println("new Drone is: " + newDrone.getStore() + ", " + newDrone.getDroneName() + ", " + newDrone.getCapacity() + ", " + newDrone.getFuel());
        if (!storeRepository.existsById(newDrone.getStore())) {
            return ResponseEntity.ok(ResponseData.create(ResponseType.STORE_DOES_NOT_EXIST));
        }
        if (droneRepository.existsByStoreAndDroneName(newDrone.getStore(), newDrone.getDroneName())) {
            return ResponseEntity.ok(ResponseData.create(ResponseType.DRONE_ID_EXISTS));
        }
        newDrone.setNumOfOrder(0);
        newDrone.setRemainingCapacity(newDrone.getCapacity());
        Drone drone = droneRepository.save(newDrone);
        return ResponseEntity.ok(ResponseData.create(ResponseType.OK_CHANGE));
    }

    // display drone
    @GetMapping("/drones/{store}")
    public ResponseEntity<ResponseData<List<Drone>>> getStoreDrones(@PathVariable String store) throws ServiceException {
        if (!storeRepository.existsById(store)) {
            return ResponseEntity.ok(ResponseData.create(ResponseType.STORE_DOES_NOT_EXIST));
        }
        List<Drone> drones = droneRepository.findAllByStore(store);
        return ResponseEntity.ok(ResponseData.create(drones));
    }

    // display item
    @GetMapping("/items/{store}")
    public ResponseEntity<ResponseData<List<Item>>> getStoreItems(@PathVariable String store) throws ServiceException {
        if (!storeRepository.existsById(store)) {
            return ResponseEntity.ok(ResponseData.create(ResponseType.STORE_DOES_NOT_EXIST));
        }
        List<Item> items = itemRepository.findAllByStoreName(store);
        return ResponseEntity.ok(ResponseData.create(items));
    }

    //display_orders
    @GetMapping("/orders/{store}")
    public ResponseEntity<ResponseData<List<UserOrder>>> getStoreOrders(@PathVariable String store) throws ServiceException {
        if (!storeRepository.existsById(store)) {
            return ResponseEntity.ok(ResponseData.create(ResponseType.STORE_DOES_NOT_EXIST));
        }
        List<UserOrder> orders = orderRepository.findAllByStoreName(store);
        return ResponseEntity.ok(ResponseData.create(orders));
    }

    @GetMapping("/transfer/{storeName}/{order}/{drone}") //transfer_order
    public String transferOrder(@PathVariable String storeName, @PathVariable String order, @PathVariable String drone) {
        if (!storeRepository.existsById(storeName)) {
            return ResponseType.STORE_DOES_NOT_EXIST.getMessage();
        }
        if (!orderRepository.existsByStoreNameAndOrderName(storeName, order) ) {
            return ResponseType.ORDER_DOES_NOT_EXIST.getMessage();
        }
        UserOrder userOrder = orderRepository.getByStoreNameAndOrderName(storeName, order);
        if (userOrder.isPurchased()){
            return ResponseType.ORDER_PURCHASED.getMessage();
        }
        if (!droneRepository.existsByStoreAndDroneName(storeName, drone)) {
            return ResponseType.DRONE_DOES_NOT_EXIST.getMessage();
        }
        Drone newDrone = droneRepository.getByStoreAndDroneName(storeName, drone);
        Drone currentDrone = userOrder.getDrone();
        if (newDrone.getRemainingCapacity() < userOrder.getWeight()) {
            return "ERROR:new_drone_does_not_have_enough_capacity";
        }
        if (currentDrone.getId() == newDrone.getId()) {
            return "OK:new_drone_is_current_drone_no_change";
        }
        userOrder.setDroneName(drone);
        userOrder.setDrone(newDrone);
        currentDrone.remove(userOrder);
        newDrone.addOrder(userOrder);
        Store store = storeRepository.getReferenceById(storeName);
        store.setTransfers(store.getTransfers() + 1);
        orderRepository.save(userOrder);
        return ResponseType.OK_CHANGE.getMessage();
    }
}
