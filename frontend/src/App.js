import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";
import DroneService from "./services/drone.service";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardStoreManager from "./components/board-storemanager.component";
import BoardAdmin from "./components/board-admin.component";

// import AuthVerify from "./common/auth-verify";
import EventBus from "./common/EventBus";
import StoreManagerProfile from "./components/storemanagerprofile.component";
import CreateNewItemComponent from "./components/create-new-item.component";
import CreateNewDroneComponent from "./components/create-new-drone.componet";
import DisplayDronesComponent from "./components/display-drones.component";
import DisplayItemsComponent from "./components/display-items";
import FlyDroneComponent from "./components/fly-drone.component";
import DisplayOrdersComponent from "./components/display-orders.selectestore.component";
import TransferOrderComponent from "./components/transfer-order.component";
import ArchiveOrderDateComponent from "./components/archive-order-date.component";
import DisplayItemsSelectStoreComponent from "./components/display-items.selectstore.component";
import DisplayDronesSelectStoreComponent from "./components/display-drones.component";
import AdminProfile from "./components/adminprofile.component";
import CreateNewStoreComponent from "./components/create-new-store.component";
import DisplayStoresComponent from "./components/display-stores.component";
import CreateNewPilotComponent from "./components/create-new-pilot.component";
import DisplayPilotsComponent from "./components/display-pilots.component";
import CreateNewCustomerComponent from "./components/create-new-customer.component";
import DisplayCustomersComponent from "./components/display-customers.component";
import AdjustReturnComponent from "./components/adjust-return.component";
import CreateNewOrderComponent from "./components/create-new-order";
import UserProfile from "./components/userprofile.component";
import DisplayOrdersForUserComponent from "./components/display-orders-for-user.component";
import PurchaseOrderComponent from "./components/purchase-order.component";
import CancelOrderComponent from "./components/cancel-order.component";
import PilotProfile from "./components/pilotprofile.component";
import DisplayOrdersSelectStoreComponent from "./components/display-orders.selectestore.component";
import ReturnOrderComponent from "./components/return-order.component";


class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
    
    EventBus.on("logout", () => {
      this.logOut();
    });
  }

  componentWillUnmount() {
    EventBus.remove("logout");
  }

  logOut() {
    AuthService.logout();
    this.setState({
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    });
  }

  render() {
    const { currentUser, showModeratorBoard, showAdminBoard } = this.state;

    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            Grocery Express
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                Home
              </Link>
            </li>

            {showModeratorBoard && (
              <li className="nav-item">
                <Link to={"/mod"} className="nav-link">
                  Moderator Board
                </Link>
              </li>
            )}

            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/admin"} className="nav-link">
                  Admin Board
                </Link>
              </li>
            )}

            {currentUser && (
              <li className="nav-item">
                <Link to={"/user"} className="nav-link">
                  User
                </Link>
              </li>
            )}
          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}
        </nav>

        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/ROLE_STOREMANAGER" element={<StoreManagerProfile />} />
            <Route path="/ROLE_ADMIN" element={<AdminProfile />} />
            <Route path="/ROLE_USER" element={<UserProfile />} />
            <Route path="/ROLE_PILOT" element={<PilotProfile />} />
            <Route path="/user" element={<BoardUser />} />
            <Route path="/mod" element={<BoardStoreManager />} />
            <Route path="/admin" element={<BoardAdmin />} />
            <Route path="/create_new_item" element={<CreateNewItemComponent />} />
            <Route path="/create_new_drone" element={<CreateNewDroneComponent />} />
            <Route path="/display_drones" element={<DisplayDronesSelectStoreComponent />} />
            <Route path="/display_items_select_store" element={<DisplayItemsSelectStoreComponent/>} />
            <Route path="/display_orders" element={<DisplayOrdersSelectStoreComponent />} />
            <Route path="/transfer_order" element={<TransferOrderComponent />} />
            <Route path="/display_efficiency" element={<ArchiveOrderDateComponent />} />
            <Route path="/create_new_store" element={<CreateNewStoreComponent />} />
            <Route path="/display_stores" element={<DisplayStoresComponent />} />
            <Route path="/create_new_pilot" element={<CreateNewPilotComponent />} />
            <Route path="/display_pilots" element={<DisplayPilotsComponent />} />
            <Route path="/create_new_customer" element={<CreateNewCustomerComponent />} />
            <Route path="/display_customers" element={<DisplayCustomersComponent />} />
            <Route path="/adjust_return" element={<AdjustReturnComponent />} />
            <Route path="/create_new_order" element={<CreateNewOrderComponent />} />
            <Route path="/request_item" element={<DisplayOrdersForUserComponent />} />
            <Route path="/purchase_order" element={<PurchaseOrderComponent />} />
            <Route path="/cancel_order" element={<CancelOrderComponent />} />
            <Route path="/fly_drone" element={<FlyDroneComponent />} />
            <Route path="/archive_order_data" element={<ArchiveOrderDateComponent />} />
            <Route path="/adjust_return" element={<AdjustReturnComponent />} />
            <Route path="return_order" element={<ReturnOrderComponent />} />
          </Routes>
        </div>

        {/* <AuthVerify logOut={this.logOut}/> */}
      </div>
    );
  }
}

export default App;
