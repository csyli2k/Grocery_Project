package edu.gatech.cs6310.Response;


import lombok.AllArgsConstructor;
import lombok.Getter;


@Getter
@AllArgsConstructor
public enum ResponseType {
    STORE_EXISTS("ERROR:store_identifier_does_not_exist"),
    STORE_DOES_NOT_EXIST("Store name does not exist"),
    ITEM_EXISTS("Item already exists"),
    ITEM_DOES_NOT_EXIST("Item name does not exist"),
    PILOT_ID_EXISTS("Pilot ID already exists"),
    PILOT_LICENSE_EXISTS("Pilot License already exists"),
    DRONE_ID_EXISTS("ERROR:drone_identifier_already_exists"),
    DRONE_DOES_NOT_EXIST("ERROR:drone_identifier_does_not_exist"),
    CUSTOMER_EXISTS("ERROR:customer_identifier_already_exists"),
    CUSTOMER_DOES_NOT_EXISTS("ERROR:customer_identifier_does_not_exist"),
    ORDER_EXISTS("ERROR:order_identifier_already_exists"),
    ORDER_DOES_NOT_EXIST("ERROR:order_identifier_does_not_exist"),
    ORDER_PURCHASED("ERROR:order has been purchased"),
    ITEM_ORDERED("ERROR:item_already_ordered"),
    CANT_AFFORD("ERROR:customer_cant_afford_new_item"),
    CANT_CARRY("ERROR:drone_cant_carry_new_item"),
    NEED_PILOT("ERROR:drone_needs_pilot"),
    NEED_FUEL("ERROR:drone_needs_fuel"),

    RETURN_TIME_ERROR("ERROR: The order past the return date"),

    RETURN_NUM_ERROR("ERROR: The customer has reached the number of maximum number of returns allowed for this month"),

    RETURN_QTY_ERROR("ERROR: Return quantity is greater than purchased quantity."),

    RETURN_DRONE_ERROR("ERROR: There is no drone available now, please come back later. "),

    RETURN_NO_ORDER_ERROR("ERROR: No such order for the customer."),

    RETURN_OK_CHANGE("OK:RETURN STARTED"),

    RETURN_COMPLETE("OK: RETURN COMPLETED"),

    OK_CHANGE("OK:CHANGE COMPLETED"),
    OK_DISPLAY("OK:DISPLAY COMPLETED");


    private final String message;
}