import React, {Component} from "react";
import axios from "axios";
import StoreService from "../services/store.service";
import OrderService from "../services/order.service";
import AuthService from "../services/auth.service";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as moment from 'moment';
import Button from "@mui/material/Button";

class ArchiveOrderDateComponent extends Component {
    constructor(props) {
        super(props);
        this.handleDateSelect = this.handleDateSelect.bind(this);
        this.onArchive = this.onArchive.bind(this);
        this.state = {
            orderList: [],
            selectedDate: moment().startOf('day').toDate(),
            message:""
        }
    }

    componentDidMount() {
        const currentUser = AuthService.getCurrentUser();

        if (!currentUser) this.setState({ redirect: "/home" });
        this.setState({
            selectedDate: moment().startOf('day').toDate()
        });
    }


    handleDateSelect(date) {
        console.log("selected date");
        console.log(date);
        this.setState({
            selectedDate: moment(date).startOf('day').toDate()
        });
        // call backend to get orders before this date
        OrderService.displayOrdersBySelectedDate(moment(date).startOf('day').toISOString()).then(
            res => {
                console.log("response.data is: ");
                console.log(res.data);
                this.setState({
                    orderList: res.data
                })
            }
        )
    }

    onArchive() {
        OrderService.deleteOrderData(this.state.selectedDate.toISOString()).then(
            res => {
                console.log("response.data is: ");
                console.log(res.data);
                this.setState({
                    message: res.data.responseType
                })
            }
        )
    }

    render() {
        return (
            <div>
                <div>
                    <label> Display orders created before this date: </label>
                    <DatePicker selected={this.state.selectedDate}
                                onSelect={this.handleDateSelect}
                                onChange={this.handleDateSelect}
                    />
                </div>
                <h2 className="text-center">Archive Order Data</h2>

                <div className="row">
                    <table className="table table-striped table-bordered">
                        <thead>
                        <tr>
                            <th> Order Id</th>
                            <th> Order Name</th>
                            <th> Store Name</th>
                            <th> Last Updated</th>
                            <th> Purchased? </th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.orderList.map(
                                order =>
                                    <tr key={order.orderId}>
                                        <td> {order.orderId} </td>
                                        <td> {order.orderName}</td>
                                        <td> {order.storeName}</td>
                                        <td> {order.timestamp}</td>
                                        <td> {order.purchased.toString()}</td>
                                    </tr>
                            )
                        }
                        </tbody>
                    </table>
                    {this.state.orderList.length > 0 &&
                        <div>
                            <Button variant="contained"
                                    type="submit"
                                    onClick={this.onArchive}>Archive Above Orders</Button>
                            <label>{this.state.message}</label>
                        </div>
                    }

                </div>

            </div>
        );
    }
}

export default ArchiveOrderDateComponent
