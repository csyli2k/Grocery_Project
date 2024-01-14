import axios from 'axios';
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/user/order"
const URL_MANAGER_ORDERS = "http://localhost:8080/manager/orders/"
const URL_USER_ORDERS = "http://localhost:8080/user/customer/"
const URL_USER_LINEORDER = "http://localhost:8080/user/orderLine/"
const URL_USER = "http://localhost:8080/user/"
const URL_MANAGER = "http://localhost:8080/manager/"
const URL_ADMIN = "http://localhost:8080/admin/"




class OrderService {

    getOrdersForStore(store){
        return axios.get(URL_MANAGER_ORDERS.concat(store), { headers: authHeader() });
    }

    getOrderById(droneId){
        return axios.get(API_URL + '/' + droneId);
    }

    createOrder(storeName, orderName, droneName, customerID) {
        return axios.post(API_URL, {
            'storeName': storeName,
            'orderName': orderName,
            'droneName': droneName,
            'customerID': customerID
        }, { headers: authHeader() }
        );
    }

    getOrdersForAccount(account) {
        return axios.get(URL_USER_ORDERS.concat(account), { headers: authHeader() });
    }

    getOrderLinesForOrderId(orderId) {
        return axios.get(URL_USER_LINEORDER.concat(orderId), { headers: authHeader() });
    }

    requestItemForOrder(storeName, orderName, itemName, quantity, unitPrice) {
        return axios.put(URL_USER_LINEORDER
            .concat(storeName).concat("/")
            .concat(orderName).concat("/")
            .concat(itemName).concat("/")
            .concat(quantity).concat("/")
            .concat(unitPrice), null,{ headers: authHeader() });
    }

    purchaseOrder(store, orderName) {
        return axios.put(URL_USER
            .concat("purchase").concat("/")
            .concat(store).concat("/")
            .concat(orderName), null,{ headers: authHeader()});
    }

    transferOrder(store, orderName,droneName ) {
        return axios.get(URL_MANAGER
            .concat("transfer").concat("/")
            .concat(store).concat("/")
            .concat(orderName).concat("/")
            .concat(droneName), { headers: authHeader()});
    }



    cancelOrder(storeName, orderName) {
        return axios.delete(URL_USER.concat("cancel")
            .concat("/").concat(storeName)
            .concat("/").concat(orderName), { headers: authHeader()});
    }

    displayOrdersBySelectedDate(date){
        return axios.get(URL_ADMIN.concat("archive")
            .concat("/").concat(date), { headers: authHeader()});
    }

    deleteOrderData(date) {
        return axios.delete(URL_ADMIN.concat("delete")
            .concat("/").concat(date), { headers: authHeader()});
    }

    returnOrderValidation(customerID, orderId) {
        return axios.post(URL_USER.concat("checkreturn")
            .concat("/").concat(customerID)
            .concat("/").concat(orderId), {
            'customerID':customerID,
            'orderId':orderId
        },{ headers: authHeader()});
    }



}

export default new OrderService()