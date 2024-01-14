import React, { Component } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import StoreService from "../services/store.service";
import AuthService from "../services/auth.service";
import PilotService from "../services/pilot.service";

export default class CreateNewPilotComponent extends Component {
    constructor(props) {
        super(props);
        this.onAccountChange = this.onAccountChange.bind(this);
        this.onFirstNameChange = this.onFirstNameChange.bind(this);
        this.onLastNameChange = this.onLastNameChange.bind(this);
        this.onLicenseChange = this.onLicenseChange.bind(this);
        this.onPhoneNumberChange = this.onPhoneNumberChange.bind(this);
        this.onTaxIdChange = this.onTaxIdChange.bind(this);
        this.onExperienceChange = this.onExperienceChange.bind(this);


        this.state = {
            account: "",
            first_name: "",
            last_name: "",
            license: "",
            phone_number: "",
            taxid: "",
            experience: "",
            successful: false,
            redirect: null
        }

    }

    componentDidMount() {
        const currentUser = AuthService.getCurrentUser();

        if (!currentUser) this.setState({ redirect: "/home" });
    }


    onAccountChange(e) {
        this.setState({
            account: e.target.value
        })
    }

    onFirstNameChange(e) {
        this.setState({
            first_name: e.target.value
        })
    }

    onLastNameChange(e) {
        this.setState({
            last_name: e.target.value
        })
    }

    onLicenseChange(e) {
        this.setState({
            license: e.target.value
        })
    }

    onPhoneNumberChange(e) {
        this.setState({
            phone_number: e.target.value
        })
    }

    onTaxIdChange(e) {
        this.setState({
            taxid: e.target.value
        })
    }

    onExperienceChange(e) {
        this.setState({
            experience: e.target.value
        })
    }


    onSubmit = (e) => {
        e.preventDefault();
        let pilot = {account: this.state.account,
                    firstName: this.state.first_name,
                    lastName: this.state.last_name,
                    license: this.state.license,
                    phoneNumber: this.state.phone_number,
                    taxID: this.state.taxid,
                    experience: this.state.experience
                    }
        console.log('pilot =>' + JSON.stringify(pilot))
        PilotService.createPilot(pilot.account, pilot.firstName, pilot.lastName, pilot.license,
            pilot.phoneNumber, pilot.taxID, pilot.experience)
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
                    <h2 className="text-center">Create New Pilot</h2>
                    <label> Account: </label>
                    <input
                        type={"text"}
                        name="account"
                        placeholder="Enter account"
                        value={this.state.account}
                        onChange={this.onAccountChange}
                    />{" "}

                </div>
                <div>
                    <label> First Name: </label>
                    <input
                        type={"text"}
                        name="fist name"
                        placeholder="Enter first name"
                        value={this.state.first_name}
                        onChange={this.onFirstNameChange}
                    />{" "}

                </div>
                <div>
                    <label> Last Name: </label>
                    <input
                        type={"text"}
                        name="last name"
                        placeholder="Enter last name"
                        value={this.state.last_name}
                        onChange={this.onLastNameChange}
                    />{" "}

                </div>
                <div>
                    <label> License: </label>
                    <input
                        type={"text"}
                        name="license"
                        placeholder="Enter license"
                        value={this.state.license}
                        onChange={this.onLicenseChange}
                    />{" "}

                </div>
                <div>
                    <label> Phone Number: </label>
                    <input
                        type={"text"}
                        name="phone number"
                        placeholder="Enter phone number"
                        value={this.state.phone_number}
                        onChange={this.onPhoneNumberChange}
                    />{" "}

                </div>
                <div>
                    <label> Tax Id: </label>
                    <input
                        type={"text"}
                        name="tax id"
                        placeholder="Enter tax id"
                        value={this.state.taxid}
                        onChange={this.onTaxIdChange}
                    />{" "}

                </div>
                <div>
                    <label> Experience: </label>
                    <input
                        type={"text"}
                        name="experience"
                        placeholder="Enter experience"
                        value={this.state.experience}
                        onChange={this.onExperienceChange}
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
