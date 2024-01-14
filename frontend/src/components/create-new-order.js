import React, { Component } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import AuthService from "../services/auth.service";
import OrderService from "../services/order.service";

export default class CreateNewOrderComponent extends Component {
    constructor(props) {
        super(props);
        this.onStoreNameChange = this.onStoreNameChange.bind(this);
        this.onOrderNameChange = this.onOrderNameChange.bind(this);
        this.onDroneNameChange = this.onDroneNameChange.bind(this);
        this.onCustomerIDChange = this.onCustomerIDChange.bind(this);
        this.state = {
            storeName: "",
            orderName: "",
            droneName: "",
            customerID: "",
            redirect: null
        }
    }

    componentDidMount() {
        const currentUser = AuthService.getCurrentUser();
        this.setState({
            customerID: currentUser.account
        })
        if (!currentUser) this.setState({ redirect: "/home" });
    }


    onStoreNameChange(e) {
        this.setState({
            storeName: e.target.value
        })
    }

    onOrderNameChange(e) {
        this.setState({
            orderName: e.target.value
        })
    }


    onDroneNameChange(e) {
        this.setState({
            droneName: e.target.value
        })
    }

    onCustomerIDChange(e) {
        this.setState({
            customerID: e.target.value
        })
    }


    onSubmit = (e) => {
        e.preventDefault();
        let order = {
            storeName: this.state.storeName,
            orderName: this.state.orderName,
            droneName: this.state.droneName,
            customerID: this.state.customerID
        }
        console.log('drone =>' + JSON.stringify(order))
        OrderService.createOrder(order.storeName, order.orderName, order.droneName, order.customerID)
            .then(res => {
                console.log("response is: ");
                console.log(res);
                switch (res.data.responseType) {
                    case "OK_CHANGE": {
                        this.setState({
                            message: "saved successfully"
                        });
                        break;
                    }
                    default:
                        this.setState({
                            message: res.data.responseType ? res.data.responseType : "it looks like something is off"
                        });
                }

            })
    }

    render() {

        return (
            <div className="container">
                <div>
                    <h2 className="text-center">Create New Order</h2>
                    <label> Store: </label>
                    <input
                        type={"text"}
                        name="store"
                        placeholder="Enter store name"
                        value={this.state.storeName}
                        onChange={this.onStoreNameChange}
                    />{" "}

                </div>

                <div>
                    <label> Order name: </label>
                    <input
                        type={"text"}
                        name="order name"
                        placeholder="Enter order name"
                        value={this.state.orderName}
                        onChange={this.onOrderNameChange}
                    />{" "}

                </div>
                <div>
                    <label> Drone name: </label>
                    <input
                        type={"text"}
                        name="name"
                        placeholder="Enter drone name"
                        value={this.state.droneName}
                        onChange={this.onDroneNameChange}
                    />{" "}

                </div>
                <div>
                    <label> Customer ID: </label>
                    <input
                        type={"text"}
                        name="customer ID"
                        placeholder={this.state.customerID}
                        value={this.state.customerID}
                        onChange={this.onCustomerIDChange}
                    />{" "}

                </div>
                <Button variant="contained"
                        type="submit"
                        onClick={this.onSubmit}>Enter</Button>
                <div>
                    <label>{this.state.message}</label>
                </div>
            </div>
        );
    }
}
