package edu.gatech.cs6310.controller;


import edu.gatech.cs6310.Response.ResponseData;
import edu.gatech.cs6310.Response.ResponseType;
import edu.gatech.cs6310.entity.*;
import edu.gatech.cs6310.repository.*;
import lombok.AllArgsConstructor;
import org.hibernate.service.spi.ServiceException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.List;

@RequestMapping("admin")
@RestController
@AllArgsConstructor
@CrossOrigin(origins = "*", maxAge = 3600)
public class AdminController {

    private CustomerRepository customerRepository;
    private StoreRepository storeRepository;
    private PilotRepository pilotRepository;
    private OrderRepository orderRepository;
    private DroneRepository droneRepository;
    private ReturnParameterRepository returnParameterRepository;

    //make store
    @PostMapping("/store")
    public ResponseEntity<ResponseData<Store>> newStore(@RequestBody Store newStore) throws ServiceException {
        System.out.println("new Store is: " + newStore.getName() + ", " + newStore.getRevenue());
        if (storeRepository.existsById(newStore.getName())) {
            return ResponseEntity.badRequest().body(ResponseData.create(ResponseType.STORE_EXISTS));
        }
        Store store = storeRepository.save(newStore);
        return ResponseEntity.ok(ResponseData.create(ResponseType.OK_CHANGE));
    }

    //make_customer
    @PostMapping("/customer")
    public ResponseEntity<ResponseData<Customer>> newCustomer(@RequestBody Customer newCustomer) throws ServiceException {
        System.out.println("new Customer is: " + newCustomer.getAccount() + ", " + newCustomer.getFirstName() + ", "
                + newCustomer.getLastName() + ", "
                + newCustomer.getPhone() + ", "
                + newCustomer.getCredit() + ","
        + newCustomer.getRating());
        if (customerRepository.existsById(newCustomer.getAccount())) {
            return ResponseEntity.ok(ResponseData.create(ResponseType.CUSTOMER_EXISTS));
        }
        Customer customer = customerRepository.save(newCustomer);
        return ResponseEntity.ok(ResponseData.create(ResponseType.OK_CHANGE));
    }

    //make pilot
    @PostMapping("/pilot")
    public ResponseEntity<ResponseData<Pilot>> newPilot(@RequestBody Pilot newPilot) throws ServiceException {
        System.out.println("new Pilot is: " + newPilot.getAccount() + ", " + newPilot.getFirstName() +
                ", " + newPilot.getLastName() +
                ", " + newPilot.getLicense() +
                ", " + newPilot.getPhoneNumber() +
                ", " + newPilot.getTaxID() +
                        ", " + newPilot.getExperience()
        );
        if (pilotRepository.existsById(newPilot.getAccount())) {
            return ResponseEntity.ok(ResponseData.create(ResponseType.PILOT_ID_EXISTS));
        } else if (pilotRepository.findPilotByLicense(newPilot.getLicense()).isPresent()) {
            return ResponseEntity.ok(ResponseData.create(ResponseType.PILOT_LICENSE_EXISTS));
        }
        Pilot pilot = pilotRepository.save(newPilot);
        return ResponseEntity.ok(ResponseData.create(ResponseType.OK_CHANGE));
    }

    //display store
    @GetMapping("/stores")
    List<Store> getAllStores() {
        return storeRepository.findAll();
    }

    //display customers
    @GetMapping("/customers")
    List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }

    //display pilots
    @GetMapping("/pilots")
    List<Pilot> getAllPilots() {
        return pilotRepository.findAll();
    }

    @GetMapping("/archive/{date}") //Display order data for review/verification before delete
    public List<UserOrder> archiveOrderData(@PathVariable String date) {
        String truncatedDate = date.split("T")[0];
        LocalDate localDate = LocalDate.parse(truncatedDate);
        return orderRepository.findAllByTimestampBefore(localDate);
    }

    @DeleteMapping("/delete/{date}") //archive order data
    @Transactional
    public ResponseEntity deleteOrderData(@PathVariable String date) {
        String truncatedDate = date.split("T")[0];
        LocalDate localDate = LocalDate.parse(truncatedDate);
        List<UserOrder> orders = orderRepository.findAllByTimestampBefore(localDate);
        for (UserOrder userOrder : orders) {
            if (userOrder.getDroneName() != null) {
                Drone drone = userOrder.getDrone();
                drone.remove(userOrder);
                droneRepository.save(drone);
            }
        }
        orderRepository.deleteByTimestampBefore(localDate);
        return ResponseEntity.ok(ResponseData.create(ResponseType.OK_CHANGE));
    }

    @PostMapping("/adjustReturn")
    public ResponseEntity changeReturnParameter(@RequestBody ReturnParameter returnParameter) {
        if (returnParameterRepository.existsById(6310)){
            ReturnParameter currentParams = returnParameterRepository.getReferenceById(6310);
            System.out.println("currentParams");
            System.out.println(currentParams);
            System.out.println(currentParams.getUniqueID());
            System.out.println(currentParams.getNumOfReturnDays());
            System.out.println(currentParams.getNumOfMaxAllowOrders());
            currentParams.setNumOfReturnDays(returnParameter.getNumOfReturnDays());
            currentParams.setNumOfMaxAllowOrders(returnParameter.getNumOfMaxAllowOrders());
            returnParameterRepository.save(currentParams);
        } else {
            ReturnParameter curr= new ReturnParameter();
            returnParameterRepository.save(curr);
        }

        return ResponseEntity.ok(ResponseData.create(ResponseType.OK_CHANGE));
    }
}