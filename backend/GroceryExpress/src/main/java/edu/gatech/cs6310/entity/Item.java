package edu.gatech.cs6310.entity;

import lombok.Getter;
import lombok.Setter;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.io.Serializable;


@Getter
@Setter
@Entity
public class Item implements Serializable {

    @Id
    @GeneratedValue
    private Long id;
    private String storeName;
    private String name;
    private Integer weight;


}
