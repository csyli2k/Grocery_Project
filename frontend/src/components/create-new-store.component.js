import React, { Component } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import StoreService from "../services/store.service";
import AuthService from "../services/auth.service";

export default class CreateNewStoreComponent extends Component {
    constructor(props) {
        super(props);
        this.onStoreNameChange = this.onStoreNameChange.bind(this);
        this.onRevenueChange = this.onRevenueChange.bind(this);
        this.state = {
            storeName: "",
            revenue: "",
            message: "",
            successful: false,
            redirect: null
        }

    }

    componentDidMount() {
        const currentUser = AuthService.getCurrentUser();

        if (!currentUser) this.setState({ redirect: "/home" });
    }


    onRevenueChange(e) {
        this.setState({
            revenue: e.target.value
        })
    }

    onStoreNameChange(e) {
        this.setState({
            storeName: e.target.value
        })
    }


    onSubmit = (e) => {
        e.preventDefault();
        let store = {storeName: this.state.storeName, revenue: this.state.revenue}
        console.log('store =>' + JSON.stringify(store))
        const user = JSON.parse(localStorage.getItem('user'));

        const authToken = (user && user.accessToken) ? 'Bearer '.concat(user.accessToken) : "";
        StoreService.createStore(store.storeName, store.revenue, authToken)
            .then(res => {
                console.log("response is: ");
                console.log(res);
                this.setState({
                    message: res.data.responseType ? res.data.responseType : "it looks like something is off"
                });
            })
    }

    render() {

        return (
            <div className="container">
                <div>
                    <h2 className="text-center">Create New Store</h2>
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
                    <label> Revenue: </label>
                    <input
                        type={"text"}
                        name="name"
                        placeholder="Enter initial revenue"
                        value={this.state.revenue}
                        onChange={this.onRevenueChange}
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
