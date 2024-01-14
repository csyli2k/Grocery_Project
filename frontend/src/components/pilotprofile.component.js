import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import BoardUser from "./board-user.component";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default class PilotProfile extends Component {
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

    handleFlyDrone() {
        console.log("Button is clicked");
        return window.open("/fly_drone");
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
                                onClick={this.handleFlyDrone}>
                                fly drone
                            </Button>
                        </div>

                    </div>: null}
            </div>
        );
    }
}
