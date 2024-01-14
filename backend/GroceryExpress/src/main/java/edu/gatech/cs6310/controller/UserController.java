package edu.gatech.cs6310.controller;

import edu.gatech.cs6310.Response.ResponseData;
import edu.gatech.cs6310.Response.ResponseType;
import edu.gatech.cs6310.entity.*;
import edu.gatech.cs6310.repository.*;
import io.jsonwebtoken.lang.Collections;
import lombok.AllArgsConstructor;
import org.hibernate.service.spi.ServiceException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RequestMapping("/user")
@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@AllArgsConstructor
public class UserController {


    private StoreRepository storeRepository;
    private OrderRepository orderRepository;
    private DroneRepository droneRepository;
    private CustomerRepository customerRepository;
    private ItemRepository itemRepository;
    private OrderLineRepository orderLineRepository;
    private PilotRepository pilotRepository;
    private ReturnRepository returnRepository;
    private ReturnParameterRepository returnParameterRepository;


    @PostMapping("/order") // start_order
    public ResponseEntity<ResponseData<UserOrder>> newOrder(@RequestBody UserOrder newOrder) throws ServiceException {

        String storeName = newOrder.getStoreName();
        if (!storeRepository.existsById(storeName)) {
            return ResponseEntity.ok(ResponseData.create(ResponseType.STORE_DOES_NOT_EXIST));
        }
        String orderName = newOrder.getOrderName();
        if (orderRepository.existsByStoreNameAndOrderName(storeName, orderName)) {
            return ResponseEntity.ok(ResponseData.create(ResponseType.ORDER_EXISTS));
        }

        String droneName = newOrder.getDroneName();
        if (!droneRepository.existsByStoreAndDroneName(storeName, droneName)) {
            return ResponseEntity.ok(ResponseData.create(ResponseType.DRONE_DOES_NOT_EXIST));
        }
        if (!customerRepository.existsById(newOrder.getCustomerID())) {
            return ResponseEntity.ok(ResponseData.create(ResponseType.CUSTOMER_DOES_NOT_EXISTS));
        }
        Drone drone = droneRepository.getByStoreAndDroneName(newOrder.getStoreName(), droneName);
        newOrder.setDrone(drone);
        newOrder.setTimestamp(LocalDate.now());
        drone.addOrder(newOrder);
        UserOrder order = orderRepository.save(newOrder);
        return ResponseEntity.ok(ResponseData.create(ResponseType.OK_CHANGE));
    }

    @PutMapping("/orderLine/{store}/{order}/{itemName}/{qty}/{price}") //request_item
    public String requestItem(@PathVariable String store, @PathVariable String order, @PathVariable String itemName
            , @PathVariable Integer qty, @PathVariable Integer price) {
        if (!storeRepository.existsById(store)) {
            return ResponseType.STORE_DOES_NOT_EXIST.getMessage();
        }
        if (!orderRepository.existsByStoreNameAndOrderName(store, order)) {
            return ResponseType.ORDER_DOES_NOT_EXIST.getMessage();
        }
        UserOrder userOrder = orderRepository.getByStoreNameAndOrderName(store, order);
        if (userOrder.isPurchased()) {
            return ResponseType.ORDER_PURCHASED.getMessage();
        }
        Optional<Item> itemOptional = itemRepository.findByStoreNameAndName(store, itemName);
        if (itemOptional.isEmpty()) {
            return ResponseType.ITEM_DOES_NOT_EXIST.getMessage();
        }
        Item item = itemOptional.get();
        if (orderLineRepository.existsByStoreNameAndOrderNameAndItemName(store, order, itemName)) {
            return ResponseType.ITEM_ORDERED.getMessage();
        }
        Integer lineWeight = qty * item.getWeight();
        Integer lineCost = qty * price;
        OrderLine orderLine = new OrderLine(itemName, store, order, qty, lineWeight, lineCost);
        orderLine.setOrderId(userOrder.getOrderId());
        Customer customer = userOrder.getCustomer();
        Drone drone = userOrder.getDrone();
        drone.update();
        if (customer.remainingCredit() < lineCost) {
            return ResponseType.CANT_AFFORD.getMessage();
        }
        if (drone.getRemainingCapacity() < lineWeight) {
            return ResponseType.CANT_CARRY.getMessage();
        }
        drone.addLine(lineWeight);
        userOrder.addLine(lineWeight, lineCost);
        userOrder.setTimestamp(LocalDate.now());
        orderLineRepository.save(orderLine);
        orderRepository.save(userOrder);
        return ResponseType.OK_CHANGE.getMessage();
    }

    @PutMapping("/purchase/{storeID}/{order}") //purchase_order
    @Transactional
    public String purchaseOrder(@PathVariable String storeID, @PathVariable String order) {
        if (!storeRepository.existsById(storeID)) {
            return ResponseType.STORE_DOES_NOT_EXIST.getMessage();
        }
        Store store = storeRepository.getReferenceById(storeID);
        if (!orderRepository.existsByStoreNameAndOrderName(storeID, order)) {
            return ResponseType.ORDER_DOES_NOT_EXIST.getMessage();
        }
        UserOrder userOrder = orderRepository.getByStoreNameAndOrderName(storeID, order);
        if (userOrder.isPurchased()) {
            return ResponseType.ORDER_PURCHASED.getMessage();
        }
        Customer customer = userOrder.getCustomer();
        Drone drone = userOrder.getDrone();
        String pilotID = drone.getPilotID();
        if (pilotID == null) {
            return ResponseType.NEED_PILOT.getMessage();
        }
        if (drone.getFuel() < 1) {
            return ResponseType.NEED_FUEL.getMessage();
        }
        Pilot pilot = pilotRepository.getReferenceById(pilotID);
        pilot.setExperience(pilot.getExperience() + 1);
        drone.deliver(userOrder);
        store.purchase(userOrder, drone);
        customer.purchase(userOrder);
        userOrder.setPurchased(true);
        userOrder.setTimestamp(LocalDate.now());
        pilotRepository.save(pilot);
        orderRepository.save(userOrder);
        return ResponseType.OK_CHANGE.getMessage();
    }

    @DeleteMapping("/cancel/{storeID}/{order}")//cancel order
    public String cancelOrder(@PathVariable String storeID, @PathVariable String order) {
        if (!storeRepository.existsById(storeID)) {
            return ResponseType.STORE_DOES_NOT_EXIST.getMessage();
        }
        Store store = storeRepository.getReferenceById(storeID);
        if (!orderRepository.existsByStoreNameAndOrderName(storeID, order)) {
            return ResponseType.ORDER_DOES_NOT_EXIST.getMessage();
        }
        UserOrder userOrder = orderRepository.getByStoreNameAndOrderName(storeID, order);
        if (userOrder.isPurchased()) {
            return ResponseType.ORDER_PURCHASED.getMessage();
        }
        Drone drone = userOrder.getDrone();
        drone.remove(userOrder);
        orderRepository.deleteById(userOrder.getOrderId());
        return ResponseType.OK_CHANGE.getMessage();
    }


    @GetMapping("/orderLine/") //Display orderline
    public ResponseEntity<List<OrderLine>> getAll() {
        return ResponseEntity.ok(orderLineRepository.findAll());
    }

    @GetMapping("/customer/{name}")//Display Customer Order
    public ResponseEntity<Customer> getCustomerOrders(@PathVariable String name) {
        System.out.println("account Name is: " + name);
        return ResponseEntity.ok(customerRepository.findById(name).get());
    }

    @GetMapping("/store/{storeName}/drone/{droneName}/")//Display Drone order
    public ResponseEntity<Drone> getDrone(@PathVariable String storeName, @PathVariable String droneName) {
        return ResponseEntity.ok(droneRepository.findByStoreAndDroneName(storeName, droneName).get());
    }


    @PostMapping("/checkreturn/{customerID}/{orderId}") //Validate return
    public String newReturn(@PathVariable String customerID, @PathVariable String orderId) {
        System.out.println(customerID);
        System.out.println(orderId);
        if (!customerRepository.existsById(customerID)) {
            return ResponseType.CUSTOMER_DOES_NOT_EXISTS.getMessage();
        }
        if (!orderRepository.existsByCustomerAccountAndOrderId(customerID, Long.valueOf(orderId))) {
            return ResponseType.ORDER_DOES_NOT_EXIST.getMessage();
        }
        UserOrder userOrder = orderRepository.getByCustomerAccountAndOrderId(customerID, Long.valueOf(orderId));
        Customer customer = customerRepository.getReferenceById(customerID);

        ReturnParameter returnParameter = new ReturnParameter();
        if (returnParameterRepository.existsById(6310)) {
            returnParameter = returnParameterRepository.getReferenceById(6310);
            if (returnParameter.getNumOfReturnDays() == null) {
                System.out.println("it looks like failed to get num of return days");
                returnParameter.setNumOfReturnDays(30);
            }
            if (returnParameter.getNumOfMaxAllowOrders() == null) {
                System.out.println("it looks like failed to get max allowed orders");
                returnParameter.setNumOfMaxAllowOrders(5);
            }
        }
        // update customer Rating
        if (returnRepository.existsByCustomerID(customerID)){
            List<ReturnOrder> returnList = returnRepository.findAllByCustomerID(customerID);
            customer.updateRating(returnList, returnParameter.getNumOfMaxAllowOrders());

        }
        LocalDate currDate = LocalDate.now();
        if (!userOrder.getTimestamp().isAfter(currDate.minusDays(returnParameter.getNumOfReturnDays()))) {
            return ResponseType.RETURN_TIME_ERROR.getMessage();
        }
        if (customer.getNumOfReturns() > (customer.getRating())) {
            return ResponseType.RETURN_NUM_ERROR.getMessage();
        }
        ReturnOrder newReturn = new ReturnOrder();
        newReturn.setCustomerID(customerID);
        newReturn.setOrderID(orderId);
        customerRepository.save(customer);
        returnRepository.save(newReturn);
        return newReturn.getReturnId().toString();
        //return ResponseType.RETURN_OK_CHANGE.getMessage();
    }

    @PostMapping("/returnItem/{returnID}/{itemName}/{qty}") //Request return Item
    public String newReturn(@PathVariable Long returnID, @PathVariable String itemName, @PathVariable Integer qty) {
        ReturnOrder returnOrder = returnRepository.getReferenceById(returnID);

        String customerID = returnOrder.getCustomerID();
        String orderID = returnOrder.getOrderID();
        UserOrder userOrder = orderRepository.getByCustomerAccountAndOrderId(customerID, Long.valueOf(orderID));
        if (userOrder == null) {
            return ResponseType.RETURN_NO_ORDER_ERROR.getMessage();
        }
        Store store = storeRepository.getReferenceById(userOrder.getStoreName());
        Item item = itemRepository.getByStoreNameAndName(store.getName(), itemName);
        OrderLine orderLine = orderLineRepository.findOrderLineByStoreNameAndOrderNameAndItemName(store.getName(), userOrder.getOrderName(), itemName);
        if (qty > orderLine.getQuantity()) {
            return ResponseType.RETURN_QTY_ERROR.getMessage();
        }
        int price = (orderLine.getLineCost() / orderLine.getQuantity()) * qty;
        int weight = qty * item.getWeight();
        //update orderline
        orderLine.returnItem(qty, price, weight);
        if (orderLine.getQuantity() > 0) {
            orderLineRepository.save(orderLine);
        } else {
            orderLineRepository.deleteById(orderLine.getId());
        }
        returnOrder.additem(weight, price);
        returnRepository.save(returnOrder);
        return ResponseType.RETURN_OK_CHANGE.getMessage();
    }

    @PostMapping("/returnOrder/{returnID}") //process return order
    public String processReturn(@PathVariable Long returnID) {
        ReturnOrder returnOrder = returnRepository.getReferenceById(returnID);
        String customerID = returnOrder.getCustomerID();
        System.out.println("customerID is " + customerID);
        String orderID = returnOrder.getOrderID();
        System.out.println("orderID is " + orderID);

        Optional<UserOrder> userOrderOptional = orderRepository.findAllByCustomerIDAndOrderId(customerID,Long.valueOf(orderID));
        if (userOrderOptional.isEmpty()) {
            return "Return order not valid";
        }
        UserOrder userOrder = userOrderOptional.get();
        Customer customer = customerRepository.getReferenceById(customerID);
        Store store = storeRepository.getReferenceById(userOrder.getStoreName());
        String returnOrderStoreName = userOrder.getStoreName();
        // assign empty drone for pickup
        List<Drone> dronesList = droneRepository.findAllByStore(returnOrderStoreName);
        if (Collections.isEmpty(dronesList)) {
            return ResponseType.DRONE_DOES_NOT_EXIST.getMessage();
        }
        Drone defaultDrone = null;
        for (Drone drone : dronesList) {
            // validate the drone still has the capacity or any other validation
            if (drone.getCapacity() < returnOrder.getWeight()) {
                continue;
            }
            defaultDrone = drone;
            returnOrder.setDroneName(defaultDrone.getDroneName());
            System.out.println("return drone Name is " + defaultDrone.getDroneName());
            break;
        }

        if (defaultDrone == null) {
            return ResponseType.DRONE_DOES_NOT_EXIST.getMessage();
        }
        // update customer Rating
        List<ReturnOrder> returnList = returnRepository.findAllByCustomerID(customerID);
        ReturnParameter returnParameter = returnParameterRepository.getReferenceById(6310);
        customer.updateRating(returnList, returnParameter.getNumOfMaxAllowOrders());
        // refund customer
        customer.returnOrder(returnOrder);
        // store refund
        store.ReturnOrder(returnOrder);
        returnRepository.save(returnOrder);
        customerRepository.save(customer);
        storeRepository.save(store);
        return ResponseType.RETURN_COMPLETE.getMessage();
    }


    @GetMapping("/returnOrders")
    List<ReturnOrder> getAllReturns() {
        return returnRepository.findAll();
    }

}


