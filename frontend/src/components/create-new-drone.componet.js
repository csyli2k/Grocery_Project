import React, { Component } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import AuthService from "../services/auth.service";
import DroneService from "../services/drone.service";

export default class CreateNewDroneComponent extends Component {
    constructor(props) {
        super(props);
        this.onStoreChange = this.onStoreChange.bind(this);
        this.onDroneNameChange = this.onDroneNameChange.bind(this);
        this.onCapacityChange = this.onCapacityChange.bind(this);
        this.onFuelChange = this.onFuelChange.bind(this);
        this.state = {
            store: "",
            droneName: "",
            capacity: "",
            fuel: "",
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


    onCapacityChange(e) {
        this.setState({
            capacity: e.target.value
        })
    }

    onFuelChange(e) {
        this.setState({
            fuel: e.target.value
        })
    }


    onDroneNameChange(e) {
        this.setState({
            droneName: e.target.value
        })
    }

    onStoreChange(e) {
        this.setState({
            store: e.target.value
        })
    }


    onSubmit = (e) => {
        e.preventDefault();
        let drone = {store: this.state.store, droneName: this.state.droneName,capacity: this.state.capacity, fuel: this.state.fuel}
        console.log('drone =>' + JSON.stringify(drone))
        DroneService.createDrone(drone.store, drone.droneName, drone.capacity, drone.fuel)
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
                    <h2 className="text-center">Create New Drone</h2>
                    <label> Store: </label>
                    <input
                        type={"text"}
                        name="store"
                        placeholder="Enter store name"
                        value={this.state.store}
                        onChange={this.onStoreChange}
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
                    <label> Capacity: </label>
                    <input
                        type={"integer"}
                        name="capacity"
                        placeholder="Enter drone capacity"
                        value={this.state.capacity}
                        onChange={this.onCapacityChange}
                    />{" "}

                </div>
                <div>
                    <label> Fuel: </label>
                    <input
                        type={"integer"}
                        name="fuel"
                        placeholder="Enter drone fuel"
                        value={this.state.fuel}
                        onChange={this.onFuelChange}
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
