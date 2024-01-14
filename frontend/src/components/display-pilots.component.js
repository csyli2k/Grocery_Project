import React, { Component } from "react";
import AuthService from "../services/auth.service";
import PilotService from "../services/pilot.service";



export default class DisplayPilotsComponent extends Component{
    constructor(props) {
        super(props);

        this.state = {
            pilotList: []
        }
    }

    componentDidMount() {
        const currentUser = AuthService.getCurrentUser();

        if (!currentUser) this.setState({ redirect: "/home" });
        PilotService.getPilots().then(response => {
            this.setState({pilotList: response.data});
        });
    }

    render() {
        return (
            <div>
                <h2 className="text-center">Display Pilot</h2>
                <div className="row">
                    <table className="table table-striped table-bordered">
                        <thead>
                        <tr>
                            <th> Account</th>
                            <th> First Name</th>
                            <th> Last Name</th>
                            <th> License</th>
                            <th> Phone Number</th>
                            <th> Tax Id</th>
                            <th> Experience</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.pilotList.map(
                                pilot =>
                                    <tr key={pilot.id}>
                                        <td> {pilot.account} </td>
                                        <td> {pilot.firstName}</td>
                                        <td> {pilot.lastName} </td>
                                        <td> {pilot.license}</td>
                                        <td> {pilot.phoneNumber} </td>
                                        <td> {pilot.taxId}</td>
                                        <td> {pilot.experience}</td>
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




