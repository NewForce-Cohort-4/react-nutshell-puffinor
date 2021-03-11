import { Route } from "react-router-dom";
import React, { Component } from "react";
import { TaskProvider } from "./tasks/TaskDataProvider"
import { TaskList } from "./tasks/TaskList"

export default class ApplicationViews extends Component {

  render() {
    return (
      <React.Fragment>

        <Route
          exact path="/" render={props => {
            return null
            // Remove null and return the component which will show news articles
          }}
        />

        <Route
          path="/friends" render={props => {
            return null
            // Remove null and return the component which will show list of friends
          }}
        />

        <Route
          path="/messages" render={props => {
            return null
            // Remove null and return the component which will show the messages
          }}
        />
        <TaskProvider>
        <Route
          path="/tasks" render={props => {
            return <TaskList />
          }}
        />
        </TaskProvider>

        <Route
          path="/events" render={props => {
            return null
            // Remove null and return the component which will show the user's events
          }}
        />

      </React.Fragment>
    );
  }
}
