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

export default class DisplayDronesSelectStoreComponent extends Component{
    constructor(props) {
        super(props);
        this.onChangeStoreName = this.onChangeStoreName.bind(this);

        this.state = {
            storeList: [],
            selectedStoreName: "",
            droneList:[]
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
        const droneList = [];
        // get drones of this store
        DroneService.getDronesForStore(e).then(response => {
            console.log(response.data);
            response.data.data.forEach(
                drone => {
                    // do whatever
                    console.log(drone);
                    droneList.push(drone);
                }
            );
            this.setState({
                droneList: droneList
            });
        });
    }

    getStoreNameListDOM() {
        const dropdownDroneList = [];
        this.state.storeList.forEach(storeName => {
            dropdownDroneList.push(
                <Dropdown.Item eventKey={storeName.toString()}>{storeName.toString()}</Dropdown.Item>);
        })
        return dropdownDroneList;
    }


    render() {
        return (
            <div>
                <h2 className="text-center">Display Drone</h2>
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
                            <th> Drone Store</th>
                            <th> Drone ID</th>
                            <th> Drone capacity</th>
                            <th> Drone fuel</th>
                            <th> Drone num_of_orders</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.droneList.map(
                                drone =>
                                    <tr key={drone.id}>
                                        <td> {drone.store} </td>
                                        <td> {drone.id}</td>
                                        <td> {drone.capacity}</td>
                                        <td> {drone.fuel}</td>
                                        <td> {drone.num_of_orders}</td>
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




