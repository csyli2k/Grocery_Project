package edu.gatech.cs6310.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@Entity
@NoArgsConstructor
public class Customer {

    @Id
    private String account;
    private String firstName;
    private String lastName;
    private String phone;
    private double rating=5;
    private Integer numOfReturns=0;
    @NotNull
    private Integer credit;
    private Integer totalSpending=0;


    //    @JsonIgnore
    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL)
    private List<UserOrder> orders;

    public Integer remainingCredit() {
        int usedCredit = 0;
        for (UserOrder userOrder : orders) {
            if (!userOrder.isPurchased()) {
                usedCredit += userOrder.getCost();
            }
        }
        return credit - usedCredit;
    }

    public void purchase(UserOrder order) {
        credit -= order.getCost();
        totalSpending+=order.getCost();
    }


    public void returnOrder(ReturnOrder returnOrder) {
        this.credit += returnOrder.getRefund();

    }

    public void updateRating(List<ReturnOrder> returnList, int rating){
        Integer totalReturn= 0;
        Integer numOfReturn=0;
        for (int i = 0; i < returnList.size(); i++) {
            ReturnOrder currReturn = returnList.get(i);
            if (currReturn.getTimestamp().isAfter(LocalDate.now().minusDays(90))) {
                totalReturn += currReturn.getRefund();
                numOfReturn+=1;
            }

        }

        double newRating=Math.ceil((this.getTotalSpending()-totalReturn)/this.getTotalSpending()* rating);
        this.rating=newRating;
        this.numOfReturns=numOfReturn;

    }





}





