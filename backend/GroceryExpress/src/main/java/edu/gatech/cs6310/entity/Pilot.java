package edu.gatech.cs6310.entity;

import lombok.Getter;
import lombok.Setter;


import javax.persistence.Entity;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;

@Getter
@Setter
@Entity
public class Pilot {
    @Id
    @NotNull
    private String account;
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private String taxID;
    @NotNull
    private Integer experience;
    @NotNull
    private String license;
}
