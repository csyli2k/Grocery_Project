import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import AuthService from "../services/auth.service";
import { DropdownButton } from "react-bootstrap";
import { Dropdown } from "react-bootstrap";
import Button from "@mui/material/Button";
import StoreService from "../services/store.service";
import DroneService from "../services/drone.service";
import OrderService from "../services/order.service";

export default class DisplayOrdersSelectStoreComponent extends Component{
    constructor(props) {
        super(props);
        this.onChangeStoreName = this.onChangeStoreName.bind(this);

        this.state = {
            storeList: [],
            selectedStoreName: "",
            orderList:[]
        }
    }

    componentDidMount() {
        const currentUser = AuthService.getCurrentUser();

        if (!currentUser) this.setState({ redirect: "/home" });
        const storeNameList = [];
        StoreService.getStores().then(response => {
            response.data.forEach(
                store => {
                    storeNameList.push(store.name);
                }
            );
            this.setState({
                storeList: storeNameList
            });
            console.log("storeNameList");
            console.log(storeNameList);
        });
    }

    onChangeStoreName(e){
        this.setState({
            selectedStoreName: e
        });
        const orderList = [];
        // get orders of this store
        OrderService.getOrdersForStore(e).then(response => {
            console.log(response.data);
            response.data.data.forEach(
                order => {
                    // do whatever
                    console.log(order);
                    orderList.push(order);
                }
            );
            this.setState({
                orderList: orderList
            });
        });
    }

    getStoreNameListDOM() {
        const dropdownOrderList = [];
        this.state.storeList.forEach(storeName => {
            dropdownOrderList.push(
                <Dropdown.Item eventKey={storeName.toString()}>{storeName.toString()}</Dropdown.Item>);
        })
        return dropdownOrderList;
    }


    render() {
        return (
            <div>
                <h2 className="text-center">Display Order</h2>
                <div className="form-group">
                    <DropdownButton
                        alignRight
                        title="Select Store"
                        id="dropdown-menu-align-right"
                        onSelect={this.onChangeStoreName}>
                        {this.getStoreNameListDOM()}
                    </DropdownButton>
                </div>



                <div className="row">
                    <table className="table table-striped table-bordered">
                        <thead>
                        <tr>
                            <th> Order Store</th>
                            <th> Order ID</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.orderList.map(
                                order =>
                                    <tr key={order.orderId}>
                                        <td> {order.storeName} </td>
                                        <td> {order.orderId}</td>
                                    </tr>
                            )
                        }
                        </tbody>
                    </table>

                </div>

            </div>
        );
    }
}




