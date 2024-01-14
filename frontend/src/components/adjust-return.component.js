import React, { Component } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import StoreService from "../services/store.service";
import AuthService from "../services/auth.service";
import DroneService from "../services/drone.service";
import ReturnService from "../services/return.service";

export default class AdjustReturnComponent extends Component {
    constructor(props) {
        super(props);
        this.onReturnTimesChange = this.onReturnTimesChange.bind(this);
        this.onReturnDaysChange = this.onReturnDaysChange.bind(this);
        this.state = {
            returnTimes: "",
            returnDays: ""
        }

    }

    componentDidMount() {
        const currentUser = AuthService.getCurrentUser();

        if (!currentUser) this.setState({ redirect: "/home" });
    }


    onReturnDaysChange(e) {
        this.setState({
            returnDays: e.target.value
        })
    }

    onReturnTimesChange(e) {
        this.setState({
            returnTimes: e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault();
        ReturnService.adjustReturn(this.state.returnDays, this.state.returnTimes).then(
            res => {
                console.log("response is: ");
                console.log(res);
                switch (res.data.responseType) {
                    case "OK_CHANGE": {
                        this.setState({
                            message: "saved successfully"
                        });
                        break;
                    }
                }
            });
    }


    render() {

        return (
            <div className="container">
                <div>
                    <h2 className="text-center">Return Policy</h2>
                    <label> Return days: </label>
                    <input
                        type={"text"}
                        name="return days"
                        placeholder="Enter return days"
                        value={this.state.returnDays}
                        onChange={this.onReturnDaysChange}
                    />{" "}

                </div>
                <div>
                    <label> Return times: </label>
                    <input
                        type={"text"}
                        name="return times"
                        placeholder="Enter return times"
                        value={this.state.returnTimes}
                        onChange={this.onReturnTimesChange}
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
