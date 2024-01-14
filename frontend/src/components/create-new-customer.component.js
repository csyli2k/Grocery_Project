import React, { Component } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import StoreService from "../services/store.service";
import AuthService from "../services/auth.service";
import CustomerService from "../services/customer.service";

export default class CreateNewCustomerComponent extends Component {
    constructor(props) {
        super(props);
        this.onAccountChange = this.onAccountChange.bind(this);
        this.onFirstNameChange = this.onFirstNameChange.bind(this);
        this.onLastNameChange = this.onLastNameChange.bind(this);
        this.onPhoneChange = this.onPhoneChange.bind(this);
        this.onCreditChange = this.onCreditChange.bind(this);
        this.onRatingChange = this.onRatingChange.bind(this);


        this.state = {
            account: "",
            firstName: "",
            lastName: "",
            phone: "",
            credit: "",
            rating: "",
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
            firstName: e.target.value
        })
    }

    onLastNameChange(e) {
        this.setState({
            lastName: e.target.value
        })
    }

    onCreditChange(e) {
        this.setState({
            credit: e.target.value
        })
    }

    onPhoneChange(e) {
        this.setState({
            phone: e.target.value
        })
    }

    onRatingChange(e) {
        this.setState({
            rating: e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault();
        let customer = {
            account: this.state.account,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            phone: this.state.phone,
            credit: this.state.credit,
            rating: this.state.rating
        }
        console.log('customer =>' + JSON.stringify(customer))
        CustomerService.createCustomer(customer.account, customer.firstName, customer.lastName, customer.phone,
            customer.credit, customer.rating)
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
                    <h2 className="text-center">Create New Customer</h2>
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
                        value={this.state.firstName}
                        onChange={this.onFirstNameChange}
                    />{" "}

                </div>
                <div>
                    <label> Last Name: </label>
                    <input
                        type={"text"}
                        name="last name"
                        placeholder="Enter last name"
                        value={this.state.lastName}
                        onChange={this.onLastNameChange}
                    />{" "}

                </div>
                <div>
                    <label> Phone: </label>
                    <input
                        type={"text"}
                        name="license"
                        placeholder="Enter phone"
                        value={this.state.phone}
                        onChange={this.onPhoneChange}
                    />{" "}

                </div>
                <div>
                    <label> Credit: </label>
                    <input
                        type={"text"}
                        name="credit"
                        placeholder="Enter credit"
                        value={this.state.credit}
                        onChange={this.onCreditChange}
                    />{" "}

                </div>
                <div>
                    <label> Rating: </label>
                    <input
                        type={"text"}
                        name="rating"
                        placeholder="Enter rating"
                        value={this.state.rating}
                        onChange={this.onRatingChange}
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
