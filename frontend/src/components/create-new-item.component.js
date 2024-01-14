import React, { Component } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import ItemService from "../services/item.service";
import AuthService from "../services/auth.service";

export default class CreateNewItemComponent extends Component {
    constructor(props) {
        super(props);
        this.onStoreNameChange = this.onStoreNameChange.bind(this);
        this.onItemNameChange = this.onItemNameChange.bind(this);
        this.onItemWeightChange = this.onItemWeightChange.bind(this);
        this.state = {
            storeName: "",
            itemName: "",
            itemWeight: "",
            message: "",
            successful: false,
            currentUser: null,
            redirect: null
        }

    }

    componentDidMount() {
        const currentUser = AuthService.getCurrentUser();

        if (!currentUser) this.setState({ redirect: "/home" });
    }


    onItemWeightChange(e) {
        this.setState({
            itemWeight: e.target.value
        })
    }


    onItemNameChange(e) {
        this.setState({
            itemName: e.target.value
        })
    }

    onStoreNameChange(e) {
        this.setState({
            storeName: e.target.value
        })
    }


    onSubmit = (e) => {
        e.preventDefault();
        let item = {storeName: this.state.storeName, itemName: this.state.itemName,itemWeight: this.state.itemWeight}
        console.log('item =>' + JSON.stringify(item))
        ItemService.createItem(item.storeName, item.itemName, item.itemWeight)
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
                    <h2 className="text-center">Create New Item</h2>
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
                    <label> Item Name: </label>
                    <input
                        type={"text"}
                        name="name"
                        placeholder="Enter item name"
                        value={this.state.itemName}
                        onChange={this.onItemNameChange}
                    />{" "}

                </div>
                <div>
                    <label> Item Weight: </label>
                    <input
                        type={"integer"}
                        name="weight"
                        placeholder="Enter item weight"
                        value={this.state.itemWeight}
                        onChange={this.onItemWeightChange}
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
