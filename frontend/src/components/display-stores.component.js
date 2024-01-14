import React, { Component } from "react";
import AuthService from "../services/auth.service";
import StoreService from "../services/store.service";


export default class DisplayStoresComponent extends Component{
    constructor(props) {
        super(props);

        this.state = {
            storeList: []
        }
    }

    componentDidMount() {
        const currentUser = AuthService.getCurrentUser();

        if (!currentUser) this.setState({ redirect: "/home" });
        StoreService.getStores().then(response => {
            this.setState({storeList: response.data});
        });
    }

    render() {
        return (
            <div>
                <h2 className="text-center">Display Store</h2>
                <div className="row">
                    <table className="table table-striped table-bordered">
                        <thead>
                        <tr>
                            <th> Store</th>
                            <th> Revenue</th>
                            <th> Overloads</th>
                            <th> Transfers</th>

                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.storeList.map(
                                store =>
                                    <tr key={store.id}>
                                        <td> {store.name} </td>
                                        <td> {store.revenue}</td>
                                        <td> {store.overload}</td>
                                        <td> {store.transfers}</td>
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




