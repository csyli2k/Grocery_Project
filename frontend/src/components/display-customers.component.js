import React, { Component } from "react";
import AuthService from "../services/auth.service";
import CustomerService from "../services/customer.service";



export default class DisplayCustomersComponent extends Component{
    constructor(props) {
        super(props);

        this.state = {
            customerList: []
        }
    }

    componentDidMount() {
        const currentUser = AuthService.getCurrentUser();

        if (!currentUser) this.setState({ redirect: "/home" });
        CustomerService.getCustomers().then(response => {
            this.setState({customerList: response.data});
        });
    }

    render() {
        return (
            <div>
                <h2 className="text-center">Display Customer</h2>
                <div className="row">
                    <table className="table table-striped table-bordered">
                        <thead>
                        <tr>
                            <th> Account</th>
                            <th> First Name</th>
                            <th> Last Name</th>
                            <th> Phone </th>
                            <th> Credit</th>
                            <th> Rating</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.customerList.map(
                                customer =>
                                    <tr key={customer.id}>
                                        <td> {customer.account} </td>
                                        <td> {customer.firstName}</td>
                                        <td> {customer.lastName} </td>
                                        <td> {customer.phone} </td>
                                        <td> {customer.credit}</td>
                                        <td> {customer.rating}</td>
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




