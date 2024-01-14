package edu.gatech.cs6310.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class ReturnParameter {
    @Id
    private Integer uniqueID=6310;
    private Integer numOfReturnDays = 30;
    private Integer numOfMaxAllowOrders = 5;
}