package edu.gatech.cs6310.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sun.istack.NotNull;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Transient;
import java.util.List;
import java.util.Set;


@Getter
@Setter
@Entity
public class Store {

    @Id
    @NotNull
    private String name;
    private int revenue;
    private int purchasedOrders;
    private int transfers;
    private int overload;

    @JsonIgnore
    @OneToMany(mappedBy = "store", cascade = CascadeType.ALL)
    private List<UserOrder> storeOrders;

    public void purchase(UserOrder userOrder, Drone drone) {
        revenue += userOrder.getCost();
        purchasedOrders++;
        if(drone.getNumOfOrder()>0){
            overload += drone.getNumOfOrder();
        }
    }

    public void ReturnOrder(ReturnOrder returnOrder) {
        revenue -= returnOrder.getRefund();
    }

}
