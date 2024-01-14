import React, { Component } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import AuthService from "../services/auth.service";
import OrderService from "../services/order.service";

export default class TransferOrderComponent extends Component {
    constructor(props) {
        super(props);
        this.onStoreNameChange = this.onStoreNameChange.bind(this);
        this.onOrderNameChange = this.onOrderNameChange.bind(this);
        this.onDroneNameChange = this.onDroneNameChange.bind(this);
        this.onSubmitTransferOrder = this.onSubmitTransferOrder.bind(this);
        this.state = {
            storeName: "",
            orderName: "",
            droneName: "",
            message: ""
        }
    }

    componentDidMount() {
        const currentUser = AuthService.getCurrentUser();
        this.setState({
            customerID: currentUser.account
        })
        if (!currentUser) this.setState({ redirect: "/home" });
    }


    onDroneNameChange(e) {
        this.setState({
            droneName: e.target.value
        })
    }


    onOrderNameChange(e) {
        this.setState({
            orderName: e.target.value
        })
    }

    onStoreNameChange(e) {
        this.setState({
            storeName: e.target.value
        })
    }

    onSubmitTransferOrder()  {
        OrderService.transferOrder(
            this.state.storeName,
            this.state.orderName,
            this.state.droneName
        ).then(res => {
            console.log("response is: ");
            console.log(res);
            this.setState({
                message: res.data
            });
        })
    }


    render() {

        return (
            <div className="container">
                <div>
                    <h2 className="text-center">Transfer Order</h2>
                    <label> Store: </label>
                    <input
                        type={"text"}
                        name="storeName"
                        placeholder="Enter store name"
                        value={this.state.storeName}
                        onChange={this.onStoreNameChange}
                    />{" "}

                </div>
                <div>
                    <label> Order name </label>
                    <input
                        type={"text"}
                        name="orderName"
                        placeholder="Enter order name"
                        value={this.state.orderName}
                        onChange={this.onOrderNameChange}
                    />{" "}

                </div>
                <div>
                    <label> New Drone name </label>
                    <input
                        type={"text"}
                        name="droneName"
                        placeholder="Enter new drone name"
                        value={this.state.droneName}
                        onChange={this.onDroneNameChange}
                    />{" "}
                </div>
                <Button variant="contained"
                        type="submit"
                        onClick={this.onSubmitTransferOrder}>Enter</Button>
                <div>{this.state.message}</div>
            </div>
        );
    }
}

