package edu.gatech.cs6310.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;
import java.io.Serializable;

@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class OrderLine implements Serializable {

    @ManyToOne
    @JoinColumn(name = "orderId", referencedColumnName = "orderId", insertable = false, updatable = false)
    @JsonIgnore
    private UserOrder userOrder;


    @Id
    @GeneratedValue
    private Long id;
    private Long orderId;
    @NotNull
    private String itemName;
    @NotNull
    private String storeName;
    @NotNull
    private String orderName;
    @NotNull
    private Integer quantity;
    private Integer lineWeight;
    private Integer lineCost;


    public OrderLine(String itemName, String storeName, String orderName, Integer quantity, Integer lineWeight, Integer lineCost) {
        this.itemName = itemName;
        this.storeName = storeName;
        this.orderName = orderName;
        this.quantity = quantity;
        this.lineWeight = lineWeight;
        this.lineCost = lineCost;
    }

    public void returnItem(Integer qty, Integer price, Integer lineWeight){
        this.quantity-=qty;
        this.lineCost-=price;
        this.lineWeight-=lineWeight;
    }

}
