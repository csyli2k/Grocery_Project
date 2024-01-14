package edu.gatech.cs6310.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import net.bytebuddy.asm.Advice;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.List;

@Getter
@Setter
@Entity
public class Drone implements Serializable {

    @Id
    @GeneratedValue
    private Long id;
    @NotNull
    private String store;
    @NotNull
    private String droneName;
    @NotNull
    private Integer capacity;
    @NotNull
    @Column(name = "trips_left")
    private Integer fuel;
    private Integer numOfOrder;
    private Integer remainingCapacity;
    String pilotID = null;

    @JsonIgnore
    @OneToMany(mappedBy = "drone", cascade = CascadeType.ALL)
    List<UserOrder> orders;

    @OneToOne
    @JsonIgnore
    private Pilot pilot;

    public void addOrder(UserOrder userOrder) {
        numOfOrder++;
        remainingCapacity -= userOrder.getWeight();
    }

    public void remove(UserOrder userOrder) {
        numOfOrder--;
        remainingCapacity += userOrder.getWeight();
    }

    public void addLine(int lineWeight) {
        remainingCapacity -= lineWeight;
    }

    public void deliver(UserOrder userOrder) {
        remainingCapacity += userOrder.getWeight();
        numOfOrder--;
        fuel--;
    }

    public void update() {
        numOfOrder = orders.size();
        int carriedWeight = 0;
        for (UserOrder order : orders) {
            if (!order.isPurchased()) {
                carriedWeight += order.getWeight();
            }
        }
        remainingCapacity = capacity - carriedWeight;
    }


    public Boolean returnOrder(ReturnOrder returnOrder){
        if (this.getRemainingCapacity()== this.getCapacity() && this.getRemainingCapacity() >= returnOrder.getWeight() && this.fuel>0){
            this.fuel-=1;
            this.numOfOrder+=1;
            return true;
        }
        return false;
    }



}
