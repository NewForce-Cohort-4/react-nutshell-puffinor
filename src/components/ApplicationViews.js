import { Route } from "react-router-dom";
import React, { Component } from "react";
import { TaskProvider } from "./tasks/TaskDataProvider"
import { TaskList } from "./tasks/TaskList"

import { MessageProvider } from "./messages/MessageProvider"
import { MessageList } from "./messages/MessageList"


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
        {/* //Run this when address is /messages */}
        <MessageProvider>
                <Route exact path="/messages">
                    <MessageList />
                </Route>
        </MessageProvider>

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
