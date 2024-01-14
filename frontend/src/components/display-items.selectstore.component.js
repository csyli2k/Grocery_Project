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
import ItemService from "../services/item.service";

export default class DisplayItemsSelectStoreComponent extends Component{
    constructor(props) {
        super(props);
        this.onChangeStoreName = this.onChangeStoreName.bind(this);

        this.state = {
            storeList: [],
            selectedStoreName: "",
            itemList:[]
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
        const itemList = [];
        // get items of this store
        ItemService.getItemsForStore(e).then(response => {
            console.log(response.data);
            response.data.data.forEach(
                item => {
                    // do whatever
                    console.log(item);
                    itemList.push(item);
                }
            );
            this.setState({
                itemList: itemList
            });
        });
    }

    getStoreNameListDOM() {
        const dropdownItemList = [];
        this.state.storeList.forEach(storeName => {
            dropdownItemList.push(
                <Dropdown.Item eventKey={storeName.toString()}>{storeName.toString()}</Dropdown.Item>);
        })
        return dropdownItemList;
    }

    handleDisplayItems() {
    }

    render() {
        return (
            <div>
                <h2 className="text-center">Select Store</h2>
                <div className="form-group">
                    <DropdownButton
                        alignRight
                        title="Select Store"
                        id="dropdown-menu-align-right"
                        onSelect={this.onChangeStoreName}>
                        {this.getStoreNameListDOM()}
                    </DropdownButton>
                </div>


                {/*<div className="form-group">
                    <Button variant="contained"
                            onClick={this.handleDisplayItems}>
                        display item
                    </Button>
                </div>*/}


                <div className="row">
                    <table className="table table-striped table-bordered">
                        <thead>
                        <tr>
                            <th> Item StoreName</th>
                            <th> Item Name</th>
                            <th> Item weight</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.itemList.map(
                                item =>
                                    <tr key={item.id}>
                                        <td> {item.storeName} </td>
                                        <td> {item.name}</td>
                                        <td> {item.weight}</td>
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



