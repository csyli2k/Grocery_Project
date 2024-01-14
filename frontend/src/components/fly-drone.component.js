import React, { Component } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import AuthService from "../services/auth.service";
import DroneService from "../services/drone.service";

export default class FlyDroneComponent extends Component {
    constructor(props) {
        super(props);
        this.onStoreChange = this.onStoreChange.bind(this);
        this.onDroneNameChange = this.onDroneNameChange.bind(this);
        this.onPilotAccountChange = this.onPilotAccountChange.bind(this);
        this.state = {
            store: "",
            droneName: "",
            pilotAccount: "",
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

    onPilotAccountChange(e) {
        this.setState({
            pilotAccount: e.target.value
        })
    }


    onSubmit = (e) => {
        e.preventDefault();
        let drone = {store: this.state.store, droneName: this.state.droneName, pilotAccount: this.state.pilotAccount}
        console.log('drone =>' + JSON.stringify(drone))
        DroneService.flyDroneByPilot(drone.store, drone.droneName, drone.pilotAccount)
            .then(res => {
                console.log("response is: ");
                console.log(res);
                switch (res.data) {
                    case "OK:CHANGE COMPLETED": {
                        this.setState({
                            message: "saved successfully"
                        });
                        break;
                    }
                    case "DRONE_DOES_NOT_EXIST": {
                        this.setState({
                            message: "drone does not exist"
                        });
                        break;
                    }
                    default:
                        this.setState({
                            message: "it looks like something is off"
                        });
                }

            })
    }

    render() {

        return (
            <div className="container">
                <div>
                    <h2 className="text-center">Fly Drone</h2>
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
                    <label> Pilot Account: </label>
                    <input
                        type={"text"}
                        name="name"
                        placeholder="Enter pilot account"
                        value={this.state.pilotAccount}
                        onChange={this.onPilotAccountChange}
                    />{" "}

                </div>

                <Button variant="contained"
                        type="submit"
                        onClick={this.onSubmit}>fly drone</Button>
                <div>
                    <label>{this.state.message}</label>
                </div>
            </div>
        );
    }
}
