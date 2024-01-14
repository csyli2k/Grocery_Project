package edu.gatech.cs6310.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
//@UniqueConstraint
public class UserOrder implements Serializable {

    @Id
    @GeneratedValue
    private Long orderId;
    @NotNull
    private String orderName;
    @NotNull
    private String droneName;
    @NotNull
    private String customerID;
    @Column(name = "store")
    @NotNull
    private String storeName;
    @NotNull
    private LocalDate timestamp;

    private Integer weight = 0;
    private Integer cost = 0;
    private boolean purchased;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "orderId")
    private List<OrderLine> orderLines = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "customerID", referencedColumnName = "account", insertable = false, updatable = false)
    @JsonIgnore
    private Customer customer;

    @ManyToOne(optional = false)
    @JoinColumn(name = "store", referencedColumnName = "name", insertable = false, updatable = false)
    @JsonIgnore
    private Store store;


    @ManyToOne(optional = false)
    @JoinColumn(name = "store", referencedColumnName = "store", insertable = false, updatable = false)
    @JoinColumn(name = "droneName", referencedColumnName = "droneName", insertable = false, updatable = false)
    @JsonIgnore
    private Drone drone;

    public void addLine(int lineWeight, int lineCost) {
        cost += lineCost;
        weight += lineWeight;
    }

//    public void returnLine(int lineWeight, int lineCost) {
//        cost -= lineCost;
//        weight -= lineWeight;
//    }


}


