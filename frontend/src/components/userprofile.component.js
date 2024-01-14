import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import BoardUser from "./board-user.component";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default class UserProfile extends Component {
    constructor(props) {
        super(props);

        this.handleRequestItem = this.handleRequestItem.bind(this);

        this.state = {
            redirect: null,
            userReady: false,
            currentUser: null,
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

    handleCreateNewOrder() {
        return window.open("/create_new_order");
    }

    handleRequestItem() {
        return window.open("/request_item");
    }

    handlePurchaseOrder() {
        return window.open("/purchase_order");
    }

    handleCancelOrder() {
        return window.open("/cancel_order");
    }

    handleReturnOrder() {
        return window.open("/return_order");
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
                                onClick={this.handleCreateNewOrder}>
                                create new order
                            </Button>
                        </div>

                        <div className="form-group">
                            <Button variant="contained"
                                    onClick={this.handleRequestItem}>
                                Request Item
                            </Button>
                        </div>


                        <div className="form-group">
                            <Button
                                variant="contained"
                                onClick={this.handlePurchaseOrder}>
                                purchase order
                            </Button>
                        </div>

                        <div className="form-group">
                            <Button
                                variant="contained"
                                onClick={this.handleCancelOrder}>
                                cancel order
                            </Button>
                        </div>

                        <div className="form-group">
                            <Button
                                variant="contained"
                                onClick={this.handleReturnOrder}>
                                return order
                            </Button>
                        </div>


                    </div>: null}
            </div>
        );
    }
}
