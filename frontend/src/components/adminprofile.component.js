import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import BoardUser from "./board-user.component";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default class AdminProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            redirect: null,
            userReady: false,
            currentUser: null
        };
    }

    componentDidMount() {
        const currentUser = AuthService.getCurrentUser();

        if (!currentUser) this.setState({ redirect: "/home" });

        this.setState({
            redirect: null,
            userReady: true,
            currentUser: currentUser
        })
    }

    handleCreateNewStore() {
        console.log("Button is clicked");
        return window.open("/create_new_store");
    }

    handleDisplayStores() {
        console.log("Button is clicked");
        return window.open("/display_stores");
    }

    handleCreateNewPilot() {
        console.log("Button is clicked");
        return window.open("/create_new_pilot");
    }

    handleDisplayPilots() {
        console.log("Button is clicked");
        return window.open("/display_pilots");
    }

    handleCreateNewCustomer() {
        console.log("Button is clicked");
        return window.open("/create_new_customer");
    }

    handleDisplayCustomers() {
        console.log("Button is clicked");
        return window.open("/display_customers");
    }

    handleAdjustReturn() {
        console.log("Button is clicked");
        return window.open("/adjust_return");
    }

    handleArchiveOrderData() {
        console.log("Button is clicked");
        return window.open("/archive_order_data");
    }


    render() {
        const { currentUser } = this.state;

        return (
            <div className="container">
                {(this.state.userReady) ?
                    <div>
                        <header className="jumbotron">
                            <h3>
                                <strong>{currentUser.username}</strong> Profile
                            </h3>
                        </header>
                        <p>
                            <strong>Id:</strong>{" "}
                            {currentUser.id}
                        </p>
                        <p>
                            <strong>Email:</strong>{" "}
                            {currentUser.email}
                        </p>
                        <strong>Authorities:</strong>
                        <p>
                            {currentUser.role ? currentUser.role : currentUser.roles[0]}
                        </p>


                        <div className="form-group">
                            <Button
                                variant="contained"
                                onClick={this.handleCreateNewStore}>
                                create new store
                            </Button>
                        </div>

                        <div className="form-group">
                            <Button variant="contained"
                                    onClick={this.handleDisplayStores}>
                                display store
                            </Button>
                        </div>


                        <div className="form-group">
                            <Button
                                variant="contained"
                                onClick={this.handleCreateNewPilot}>
                                create new pilot
                            </Button>
                        </div>

                        <div className="form-group">
                            <Button
                                variant="contained"
                                onClick={this.handleDisplayPilots}>
                                display pilots
                            </Button>
                        </div>

                        <div className="form-group">
                            <Button
                                variant="contained"
                                onClick={this.handleCreateNewCustomer}>
                                create new customer
                            </Button>
                        </div>

                        <div className="form-group">
                            <Button
                                variant="contained"
                                onClick={this.handleDisplayCustomers}>
                                display customers
                            </Button>
                        </div>


                        <div className="form-group">
                            <Button
                                variant="contained"
                                onClick={this.handleAdjustReturn}>
                                adjust return
                            </Button>
                        </div>

                        <div className="form-group">
                            <Button
                                variant="contained"
                                onClick={this.handleArchiveOrderData}>
                                archive order data
                            </Button>
                        </div>


                    </div>: null}
            </div>
        );
    }
}
