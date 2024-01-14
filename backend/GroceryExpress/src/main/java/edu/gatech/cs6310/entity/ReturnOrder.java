package edu.gatech.cs6310.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import edu.gatech.cs6310.Response.ResponseType;
import edu.gatech.cs6310.auth.models.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class ReturnOrder {
    @Id
    @GeneratedValue
    private Long returnId;
    private String droneName;
    private String customerID;

    private String storeName;
    private String orderID;
    private LocalDate timestamp=LocalDate.now();
    private Integer weight=0;

    private Integer refund=0;




    public void additem(int lineWeight, int lineCost){
        refund += lineCost;
        weight += lineWeight;
    }

    public boolean assignDrone(List<Drone> dronesList){
        for (int i = 0; i < dronesList.size(); i++) {
            Drone currDrone = dronesList.get(i);
            if (currDrone.returnOrder(this)) {
                this.setDroneName(currDrone.getDroneName());
                return true;
            }
        }
        return false;

    }


}
