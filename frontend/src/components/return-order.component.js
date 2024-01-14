import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import AuthService from "../services/auth.service";
import { DropdownButton } from "react-bootstrap";
import { Dropdown } from "react-bootstrap";
import Button from "@mui/material/Button";
import UserService from "../services/user.service";
import OrderService from "../services/order.service";
import ItemService from "../services/item.service";
import StoreService from "../services/store.service";
import ReturnService from "../services/return.service";

export default class ReturnOrderComponent extends Component {
    constructor(props) {
        super(props);
        this.handleAccountChange = this.handleAccountChange.bind(this);
        this.onSubmitAccountChange = this.onSubmitAccountChange.bind(this);
        this.handleStoreNameChange = this.handleStoreNameChange.bind(this);
        this.handleOrderIdChange = this.handleOrderIdChange.bind(this);
        this.onReturnOrderValidation = this.onReturnOrderValidation.bind(this);
        this.onRequestOfItemReturn = this.onRequestOfItemReturn.bind(this);
        this.onReturnOrder = this.onReturnOrder.bind(this);
        this.handleReturnIdChange = this.handleReturnIdChange.bind(this);
        this.handleItemNameChange = this.handleItemNameChange.bind(this);
        this.handleQtyChange = this.handleQtyChange.bind(this);
        this.state = {
            orderList: [],
            account: "",
            orderId: "",
            storeName: "",
            orderName: "",
            returnValidationMessage: "",
            requestItemReturnMessage: "",
            returnExecutionMessage:"",
            returnID: "",
            itemName: "",
            qty:""
        }
    }

    componentDidMount() {
        const currentUser = AuthService.getCurrentUser();
        this.setState({
            account: currentUser.account
        });
        if (!currentUser) this.setState({ redirect: "/home" });
    }

    handleAccountChange(e) {
        this.setState({
            account: e.target.value
        })
    }

    onSubmitAccountChange() {
        OrderService.getOrdersForAccount(this.state.account).then(response => {
            console.log(response.data);
            this.setState( {
                    orderList: response.data.orders
                }
            )
        });
    }

    handleOrderIdChange(e) {
        this.setState({
            orderId: e.target.value
        })
    }

    handleStoreNameChange(e) {
        this.setState({
            storeName: e.target.value
        })
    }


    handleReturnIdChange(e) {
        this.setState({
            returnID: e.target.value
        })
    }

    handleItemNameChange(e) {
        this.setState({
            itemName: e.target.value
        })
    }
    handleQtyChange(e) {
        this.setState({
            qty: e.target.value
        })
    }


    onReturnOrderValidation(){
        OrderService.returnOrderValidation(
            this.state.account,
            this.state.orderId
        ).then
        (res => {
            console.log("response is: ");
            console.log(res);
            this.setState({
                returnValidationMessage: res.data ? res.data.toString() : "it looks like something is off"
            });
        })
    }

    onRequestOfItemReturn(){
        ReturnService.requestItemReturn(
            this.state.returnID,
            this.state.itemName,
            this.state.qty
        ).then
        (res => {
            console.log("response is: ");
            console.log(res);
            this.setState({
                requestItemReturnMessage: res.data ? res.data.toString() : "it looks like something is off"
            });
        })
    }


    onReturnOrder() {

        ReturnService.returnOrder(
            this.state.returnID,
        ).then(res => {
            console.log("response is: ");
            console.log(res);
            this.setState({
                returnExecutionMessage: res.data ? res.data.toString() : "it looks like something is off"
            });
        })
    }

    render() {
        return (
            <div>
                <div>
                    <label> Account: </label>
                    <input
                        type={"text"}
                        name="accountName"
                        placeholder="Enter account name"
                        value={this.state.account}
                        onChange={this.handleAccountChange}
                    />{" "}
                </div>
                <div>
                    <Button variant="contained"
                            type="submit"
                            onClick={this.onSubmitAccountChange}>Enter Account Id</Button>
                </div>
                <br/><br/>

                <h2 className="text-center">Display Orders</h2>
                <div className="row">
                    <table className="table table-striped table-bordered">
                        <thead>
                        <tr>
                            <th> Order ID</th>
                            <th> Order StoreName</th>
                            <th> Order OrderName</th>
                            <th> Order droneName</th>
                            <th> Order weight</th>
                            <th> Order cost</th>
                            <th> Order Purchased</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.orderList.map(
                                order =>
                                    <tr key={order.orderId}>
                                        <td> {order.orderId} </td>
                                        <td> {order.storeName} </td>
                                        <td> {order.orderName}</td>
                                        <td> {order.droneName}</td>
                                        <td> {order.weight}</td>
                                        <td> {order.cost}</td>
                                        <td> {order.purchased.toString()}</td>
                                    </tr>
                            )
                        }
                        </tbody>
                    </table>

                </div>

                {/*Return Order validation*/}


                <div>
                    <label> Account: </label>
                    <input
                        type={"text"}
                        name="storeName"
                        placeholder="Enter customer ID"
                        value={this.state.account}
                        onChange={this.handleAccountChange}
                    />{" "}
                </div>
                <div>
                    <label> Order Id: </label>
                    <input
                        type={"text"}
                        name="orderName"
                        placeholder="Enter order Id"
                        value={this.state.orderId}
                        onChange={this.handleOrderIdChange}
                    />{" "}
                </div>
                <div>
                    <Button variant="contained"
                            type="submit"
                            onClick={this.onReturnOrderValidation}>Step1: Return Order Validation</Button>
                </div>
                <div>
                    <label>Your Return ID is:</label>
                    <label>{this.state.returnValidationMessage}</label>
                </div>
                <br/><br/>


                {/*Request of Item Return*/}


                <div>
                    <label> Return ID: </label>
                    <input
                        type={"text"}
                        name="returnID"
                        placeholder="Enter return ID"
                        value={this.state.returnID}
                        onChange={this.handleReturnIdChange}
                    />{" "}
                </div>
                <div>
                    <label> Item Name: </label>
                    <input
                        type={"text"}
                        name="itemName"
                        placeholder="Enter item name"
                        value={this.state.itemName}
                        onChange={this.handleItemNameChange}
                    />{" "}
                </div>

                <div>
                    <label> Qty: </label>
                    <input
                        type={"text"}
                        name="qty"
                        placeholder="Enter qty"
                        value={this.state.qty}
                        onChange={this.handleQtyChange}
                    />{" "}
                </div>
                <div>
                    <Button variant="contained"
                            type="submit"
                            onClick={this.onRequestOfItemReturn}>Step2: Request Item Return</Button>
                </div>
                <div>
                    <label>{this.state.requestItemReturnMessage}</label>
                </div>
                <br/><br/>


                {/*return order*/}

                <div>
                    <label> Return ID: </label>
                    <input
                        type={"text"}
                        name="returnID"
                        placeholder="Enter Return ID"
                        value={this.state.returnID}
                        onChange={this.handleReturnIdChange}
                    />{" "}
                </div>
                <div>
                    <Button variant="contained"
                            type="submit"
                            onClick={this.onReturnOrder}>Step3: Return Order</Button>
                </div>
                <div>
                    <label>{this.state.returnExecutionMessage}</label>
                </div>
                <br/><br/>

            </div>
        );
    }
}



