import React, {Component} from "react";
import axios from "axios";
import ItemService from "../services/item.service";
import AuthService from "../services/auth.service";

class DisplayItemsComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items:[]
        }
    }

    componentDidMount() {

        const currentUser = AuthService.getCurrentUser();

        if (!currentUser) this.setState({redirect: "/home"});

        //let item = {storeName: this.state.storeName, itemName: this.state.itemName,itemWeight: this.state.itemWeight}
        //console.log('item =>' + JSON.stringify(item))
        //const user = JSON.parse(localStorage.getItem('user'));

        //const authToken = (user && user.accessToken) ? 'Bearer '.concat(user.accessToken) : "";
    }

    render() {
        return (
            <div>
                <h2 className="text-center">Item List</h2>
                <div className="row">
                    <table className="table table-striped table-bordered">
                        <thead>
                        <tr>
                            <th> Item StoreName</th>
                            <th> Item Name</th>
                            <th> Item weight</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.items.map(
                                item =>
                                    <tr key={item.id}>
                                        <td> {item.storeName} </td>
                                        <td> {item.name}</td>
                                        <td> {item.weight}</td>
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

export default DisplayItemsComponent
