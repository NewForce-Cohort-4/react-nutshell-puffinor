/* 
Nutshell component that activates the main components for logged in users, but only shows a login page if a user hasn't logged in before. Also provides manual logout functionality for a user.
Adapted from Kennels project by Vincent O.
 */

import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import NavBar from "./nav/NavBar";
import ApplicationViews from "./ApplicationViews";
import { Login } from "./auth/Login";
import { Register } from "./auth/Register";
import { Logout } from "./auth/Logout";
import "./Nutshell.css";

class Nutshell extends Component {
  render() {
    return (
      <React.Fragment>
        <Route
          render={() => {
            if (localStorage.getItem("nutshell_user")) {
              return (
                <>
                  <NavBar />
                  <ApplicationViews />
                </>
              );
            } else {
              return <Redirect to="/login" />;
            }
          }}
        />
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/logout">
          <Logout />
        </Route>
      </React.Fragment>
    );
  }
}

export default Nutshell;
